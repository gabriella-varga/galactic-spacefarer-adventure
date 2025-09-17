const cds = require('@sap/cds');
module.exports = class Handlers extends cds.ApplicationService {

    async init() {
        const { Spacefarers, Planets } = this.entities;

        return super.init();
    }
};
