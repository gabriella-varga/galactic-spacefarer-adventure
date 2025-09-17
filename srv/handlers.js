const cds = require('@sap/cds');
const nodemailer = require('nodemailer');
module.exports = class Handlers extends cds.ApplicationService {

    async init() {
        const { Spacefarers, Planets } = this.entities;
        this.before('CREATE', Spacefarers, async (req) => {
            console.log('BEFORE CREATE — payload:', req.data);

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

        this.after('CREATE', Spacefarers, async (row, req) => {
            console.log('AFTER CREATE', { ID: row.ID, name: row.name });

            // hard coded sender for demo purposes only
            const to = row.email ||  'spacefarer@...';
            const transporter = nodemailer.createTransport(
                process.env.SMTP_HOST || process.env.SMTP_PORT
                    ? {
                        host: process.env.SMTP_HOST || 'localhost',
                        port: Number(process.env.SMTP_PORT || 1025),
                        secure: false,
                        auth: process.env.SMTP_USER
                            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
                            : undefined,
                    }
                    : { jsonTransport: true }
            );

            try {
                const info = await transporter.sendMail({
                    // hard coded sender for demo purposes only
                    from: req.user.attributes.email || 'space-recruiter@...',
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

        return super.init();
    }
};
