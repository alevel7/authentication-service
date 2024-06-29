const loginValidator = {
    username: 'email|required',
    password: "string|min:5|required",
    uniqueId: "string|required"
}

const RegisterValidator = {
    firstName: 'string|required',
    lastName: 'string|required',
    phoneNumber: 'string|min:11|required',
    username: 'string|required',
    bvn: 'string|required',
    password: "string|min:5|required",
    uniqueId: "string|required"
}

const UpdateValidator = {
    username: 'string',
    firstName: 'string',
    lastName: 'string',
    phoneNumber: 'string|min:11',
}
const SecurityQuestionValidator = {
    'question.*': 'number|required',
    'answer.*': 'string|required'
}

const verifyTokenPayload = {
    token: 'string|required',
    phoneNumber: 'string|required',
    uniqueId: "string|required",
    errorType: 'string|required',
}
const resendTokenpayload = {
    phoneNumber: 'string|required'
}
module.exports = {
    loginValidator,
    RegisterValidator,
    UpdateValidator,
    SecurityQuestionValidator,
    verifyTokenPayload,
    resendTokenpayload
}