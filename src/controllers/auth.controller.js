let Validator = require('validatorjs');
const validators = require('../validators')
const  authService = require('../service/auth.service')
class AuthController {
    async register(req, res) {
        let validation = new Validator(req.body, validators.RegisterValidator);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }
       

        const serviceResponse = await authService.registerUser(req.body);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
    async login(req, res) {
        let validation = new Validator(req.body, validators.loginValidator);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }

        const serviceResponse = await authService.loginUser(req.body);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
    async update(req, res) {
        let validation = new Validator(req.body, validators.UpdateValidator);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }

        const serviceResponse = await authService.updateUser(req.body);
        return res.status(serviceResponse.code).json(serviceResponse);
    }

    async getSecurityQuestions(req, res) {
        const serviceResponse = await authService.getSecurityQuestions();
        return res.status(200).json(serviceResponse);
    }
    async saveUserSecurityAnswer(req, res) {
        let validation = new Validator(req.body.data, validators.SecurityQuestionValidator);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }
        const serviceResponse = await authService.saveUserSecurityAnswer(req.body.data, req.params.userId);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
    async getUserByBvn(req, res) {
        
    }

    async verifyToken(req, res) {
        let validation = new Validator(req.body, validators.verifyTokenPayload);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }
        const serviceResponse = await authService.verifyUserToken(req.body);
        return res.status(serviceResponse.code).json(serviceResponse);
    }
    
    async resendToken(req, res) {
        let validation = new Validator(req.body, validators.resendTokenpayload);
        const itFailed = validation.fails();

        if (itFailed) {
            const errorFields = Object.keys(validation.errors.errors);
            const firstField = errorFields[0];
            return res.status(400).json({
                success: false,
                message: validation.errors.errors[firstField][0],
            });
        }
        const serviceResponse = await authService.resendToken(req.body);
        return res.status(serviceResponse.code).json(serviceResponse);
    }

}
module.exports =  new AuthController();