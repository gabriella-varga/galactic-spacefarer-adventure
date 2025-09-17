const cds = require('@sap/cds');
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

        return super.init();
    }
};
