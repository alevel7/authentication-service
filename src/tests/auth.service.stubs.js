const sinon = require("sinon");

const authService = require('../service/auth.service');


const registerUser = sinon.stub(authService, "registerUser")

module.exports = {
    registerUser
}