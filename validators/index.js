const loginValidator = {
    username: 'email|required',
    password: "string|min:5|required"
}

const RegisterValidator = {
    firstName: 'string|required',
    lastName: 'string|required',
    phoneNumber: 'string|min:11|required',
    username: 'string|required',
    password: "string|min:5|required",
    uniqueId: "string|required"
}

const UpdateValidator = {
    username: 'string',
    firstName: 'string',
    lastName: 'string',
    phoneNumber: 'string|min:11',
}

module.exports = {
    loginValidator,
    RegisterValidator,
    UpdateValidator
}