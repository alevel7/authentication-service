const express = require('express');
const routes = require('./routes')
const cors = require('cors');

require('dotenv').config()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
class App {
    server;
    constructor() {
        this.server = express();
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors(corsOptions))
        // this.server.options('*', cors())
    }

    routes() {
        this.server.use('/api/users',routes.authRoute);
    }
}

module.exports = new App().server;