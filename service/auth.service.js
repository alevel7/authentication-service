const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenService = require('../service/otp.service');

require('dotenv').config()

const registerUser = async (data) => {
    let user = await db.User.findOne({
        where: {
            username: data.username
        }
    })
    if (user) {
        return {
            success: false,
            message: 'user already exists',
            code: 400
        }
    }
    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // create new user account
    user = await db.User.create({ ...data, password: hashedPassword });

    // send otp to first time registerers
    try {
        await tokenService.sendVerificationToken(data.phoneNumber)
    } catch (error) {
        console.log(error.response.data);
    }
   
    // return success response
    return {
        success: true,
        message: 'user registration successful',
        code: 201,
        data: user
    }
}

const loginUser = async (data) => {
    let user = await db.User.findOne({
        where: {
            username: data.username
        }
    })
    if(!user) {
        return {
            success: false,
            message: 'username or password is invalid',
            code: 400,
        }
    } 

    // validate password
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
        return {
            code: 400,
            success: false,
            message: 'username or password is invalid',
        };
    }
    //generate token
    const token = jwt.sign({ username: user.id, phoneNumber: user.phoneNumber }, process.env.SECRET_KEY);
    // return response with token
    return {
        code: 200,
        success: true,
        data: {user, token}
    }
}

const updateUser = async (data) => {
    let user = await db.User.findOne({
        where: {
            username: data.username
        }
    });
    await db.User.update(
        { ...data },
        {
            where: {
                username: data.username
            },
        },
    );
    return {
        success: true,
        message: 'user registration successful',
        code: 200,
        data: user
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser
}