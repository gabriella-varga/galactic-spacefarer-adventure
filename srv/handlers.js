const cds = require('@sap/cds');
const nodemailer = require('nodemailer');

module.exports = class Handlers extends cds.ApplicationService {

    async init() {
        const { Spacefarers, Planets } = this.entities;

        const hasRole = (req, role) =>
            req.user?.is?.(role) ||
            (Array.isArray(req.user?.roles) && req.user.roles.includes(role)) ||
            (req.user?.roles?.has && req.user.roles.has(role)); // Set-like
        const canMutate = (req) => hasRole(req, 'Admin') || hasRole(req, 'Recruiter');
        const getUserPlanetName = (req) => {
            const v = req?.user?.attributes?.planet;
            return Array.isArray(v) ? v[0] : v;
        };

        const mapPlanetNameToCode = async (planetName) => {
            if (!planetName) return undefined;
            const row = await SELECT.one.from(Planets).columns('code').where({ name: planetName });
            return row?.code;
        };
        const computeMerit = (stardust, skill) =>
            Math.round((Number(stardust) || 0) / 100) + (Number(skill) || 0);

        this.before('CREATE', Spacefarers, async (req) => {
            console.log('BEFORE CREATE — payload:', req.data);

            if (!canMutate(req)) return req.reject(403, 'Not allowed to create spacefarers');

            const userPlanetName = getUserPlanetName(req);
            const code = await mapPlanetNameToCode(userPlanetName);
            if (!req?.data?.originPlanet_code) {
                req.data.originPlanet_code = code;
                console.log(`originPlanet_code enforced to ${code} (${userPlanetName})`);
            }

            const sRaw = req.data.stardustCollection ?? 0;
            const wRaw = req.data.wormholeNavigationSkill ?? 0;

            let s = Number(sRaw);
            let w = Number(wRaw);

            if (!Number.isFinite(s) || !Number.isInteger(s) || s < 0) {
                return req.reject(400, 'stardustCollection must be a non-negative integer');
            }
            if (!Number.isFinite(w) || !Number.isInteger(w)) {
                return req.reject(400, 'wormholeNavigationSkill must be an integer');
            }
            if (w < 1 || w > 10) {
                return req.reject(400, 'wormholeNavigationSkill must be between 1 and 10');
            }

            if (s < 100) {
                req.data.stardustCollection = 100;
                console.log('stardustCollection level up -> 100');
            }

            if (w < 5) {
                req.data.wormholeNavigationSkill = 5;
                console.log('wormholeNavigationSkill level up -> 5');
            }

            req.data.totalMerit = computeMerit(req.data.stardustCollection, req.data.wormholeNavigationSkill);
            console.log(`totalMerit (pre-save): ${req.data.totalMerit}`);
        });

        this.before('READ', Spacefarers, async (req) => {
            if (hasRole(req, 'Admin')) return;
            const userPlanetName = req?.user?.attributes?.planet?.[0];
            if (!userPlanetName) return;
            const row = await SELECT.one.from(Planets).columns('code').where({ name: userPlanetName });
            if (row?.code) req.query.where({ originPlanet_code: row.code });
        });


        this.before(['UPDATE', 'DELETE'], Spacefarers, async (req) => {
            if (!canMutate(req)) return req.reject(403, 'Not allowed');

            if (!hasRole(req, 'Admin')) {
                const userPlanetCode = await mapPlanetNameToCode(getUserPlanetName(req));
                if (!userPlanetCode) return req.reject(403, 'Your account has no planet assigned');

                const existing = await SELECT.one.from(Spacefarers)
                    .columns('originPlanet_code')
                    .where({ ID: req.data.ID });
                if (!existing) return req.reject(404);

                if (existing.originPlanet_code !== userPlanetCode) {
                    return req.reject(403, 'You can only modify spacefarers from your own planet');
                }

                if ('originPlanet_code' in req.data && req.data.originPlanet_code !== userPlanetCode) {
                    return req.reject(403, 'Changing origin planet is not allowed');
                }
            }
        });

        this.after('CREATE', Spacefarers, async (row, req) => {
            console.log('AFTER CREATE', { ID: row.ID, name: row.name });

            const to = row.email;
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: 587,
                auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                } : undefined
            });

            try {
                const info = await transporter.sendMail({
                    from: process.env.MAIL_FROM,
                    to,
                    subject: 'Welcome to the Galactic Spacefarer Adventure!',
                    text:
                        `Congrats ${row.name}!\n\n` +
                        `Planet: ${row.originPlanet_code ?? 'N/A'}\n` +
                        `Stardust: ${row.stardustCollection}\n` +
                        `Wormhole Skill: ${row.wormholeNavigationSkill}\n` +
                        `Happy space adventures!\n` +
                        `-- The Galactic Spacefarer Team`
                });

                console.log('Email sent:', info.envelope);
            } catch (e) {
                console.log('Email send error:', e);
            }
        });

        this.after(['READ', 'CREATE', 'UPDATE'], Spacefarers, (rows) => {
            const arr = Array.isArray(rows) ? rows : [rows];
            for (const r of arr) {
                if (!r) continue;
                r.totalMerit = computeMerit(r.stardustCollection, r.wormholeNavigationSkill);
            }
            console.log(`AFTER ${Array.isArray(rows) ? 'READ' : 'MUTATION'} — returned ${arr.length} row(s)`);
        });

        return super.init();
    }
};
