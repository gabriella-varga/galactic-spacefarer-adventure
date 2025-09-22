const fs = require('fs');
const path = require('path');
const cds = require('@sap/cds');

(async () => {
    const dbfile ='db/galaxy.db';
    const full = path.resolve(dbfile);
    if (!fs.existsSync(path.dirname(full))) fs.mkdirSync(path.dirname(full), { recursive: true });

    if (!fs.existsSync(full)) {
        console.log(`[ensure-db] Deploying model to sqlite:${dbfile} ...`);
        const model = await cds.load('*');
        await cds.deploy(model).to('sqlite:' + full);
        console.log('[ensure-db] Created ' + dbfile);
    } else {
        console.log('[ensure-db] Using existing ' + dbfile);
    }
})().catch((e) => { console.error('[ensure-db] Failed:', e); process.exit(1); });
