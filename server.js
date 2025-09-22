const cds = require('@sap/cds');
const cors = require('cors');

cds.on('bootstrap', app => {
    const allowlist = ['http://localhost:5173'].filter(Boolean);
    const corsOptions = {
        origin(origin, cb) {
            if (!origin) return cb(null, true);
            return allowlist.includes(origin) ? cb(null, true) : cb(new Error('CORS blocked'));
        },
        methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
        allowedHeaders: ['Content-Type','Authorization','Prefer','If-Match'],
        exposedHeaders: ['etag','location','odata-version'],
        credentials: true,
        maxAge: 600
    };
    app.use(cors(corsOptions));
});
