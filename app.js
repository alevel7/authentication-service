const express = require('express');
const routes = require('./routes')

require('dotenv').config()

const cors = require('cors');
class App {
    server;

    constructor() {
        this.server = express();
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors())
    }

    routes() {
        this.server.use('/api/users', routes.authRoute);
    }
}

module.exports = new App().server;