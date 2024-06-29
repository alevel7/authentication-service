const { faker } = require('@faker-js/faker');

const User = {
    firstName: faker.string.sample(),
    lastName: faker.string.sample(),
    username: faker.string.sample(),
    password: faker.string.sample(),
    phoneNumber: faker.phone.number(),
    uniqueId: faker.string.sample(),
    pinCode: faker.string.sample(),
    isPhoneValid: faker.datatype.boolean(),
}

module.exports = {
    User
}