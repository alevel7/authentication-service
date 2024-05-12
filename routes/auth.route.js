const Router = require('express').Router;
const authController = require('../controllers/auth.controller')



const routes = Router();

routes.post('/register', authController.register)
routes.put('/update', authController.update)
routes.post('/login', authController.login);

module.exports = routes;