const Router = require('express').Router;
const authController = require('../controllers/auth.controller')



const routes = Router();

routes.post('/register', authController.register)
routes.get('/getUserByBvn', authController.getUserByBvn)
routes.put('/update', authController.update)
routes.post('/login', authController.login);
routes.get('/security', authController.getSecurityQuestions);
routes.post('/:userId/security', authController.saveUserSecurityAnswer);
routes.post('/verifyToken', authController.verifyToken);
routes.post('/resendToken', authController.resendToken);
routes.get('/', async(req, res) => res.send('Hello World!'));

module.exports = routes;