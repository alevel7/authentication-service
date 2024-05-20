const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const tokenService = require('../service/otp.service');
const otpService = require('../service/otp.service');

require('dotenv').config()

const registerUser = async (data) => {
    let user = await db.User.findOne({
        where: {
            [Op.or]: [
                { username: data.username },
                { bvn: data.bvn },
                { phoneNumber: data.phoneNumber }
            ],
        }
    })


    if (user) {
        const questions = await db.user_security_question.findAll({
            where: {
                userId: user.id
            }
        })
        return {
            success: false,
            message: 'user already exists (Bvn, phone number or username)',
            code: 400,
            data: questions
        }
    }
    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // create new user account
    user = await db.User.create({ ...data, password: hashedPassword });
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
    if (!user) {
        return {
            success: false,
            message: 'username or password is invalid',
            code: 400,
        }
    }
    // check that phone is verified
    if (!user.isPhoneValid) {
        const result = await tokenService.sendVerificationToken(user.phoneNumber)
        await db.User.update(
            { pinCode: result.data.pinId },
            {
                where: {
                    phoneNumber: user.phoneNumber
                },
            },
        );
        return {
            success: false,
            message: 'INVALID_PHONE_NUMBER',
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
    // check that fingerprint is correct
    if (user.uniqueId !== data.uniqueId) {
        // send otp to phone
        console.log(user.uniqueId, data.uniqueId);
        // await tokenService.sendVerificationToken(user.phoneNumber)
        return {
            code: 409,
            success: false,
            message: 'We detected login from a different device, an otp has been sent to you for verification',
        };
    }
    //generate token
    const token = jwt.sign({ username: user.id, phoneNumber: user.phoneNumber }, process.env.SECRET_KEY);
    // return response with token
    return {
        code: 200,
        success: true,
        data: { user, token }
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
    user = await db.User.findOne({
        where: {
            username: data.username
        }
    });
    return {
        success: true,
        message: 'user update successful',
        code: 200,
        data: user
    }
}

const getSecurityQuestions = async () => {
    return {
        success: true,
        message: 'all Questions',
        code: 200,
        data: await db.security_question.findAll()
    }
}
const saveUserSecurityAnswer = async (data, userId) => {
    const user = await db.User.findOne({
        where: {
            id: userId
        }
    });
    if (!user) {
        return {
            success: false,
            message: 'user not found',
            code: 400
        }
    }
    const qa = data.map(q => {
        return {
            userId,
            security_question_id: q.question,
            answer: q.answer
        }
    });
    const result = []
    for (const d of qa) {
        result.push(await db.user_security_question.create(d))
    }
    return {
        success: true,
        message: 'all Questions',
        code: 200,
        data: result
    }
}

const verifyUserToken = async (data) => {
    let user = await db.User.findOne({
        where: {
            phoneNumber: data.phoneNumber
        }
    });
    if (!user) {
        return {
            success: false,
            message: 'user not found',
            code: 400
        }
    }
    try {
        const result = await otpService.verifyToken(data.token, user.pinCode)
        if (result.data.verified === true) {
            const result = await db.User.update(
                { isPhoneValid: true },
                {
                    where: {
                        phoneNumber: data.phoneNumber
                    },
                },
            );
            return {
                success: true,
                message: 'user update successful',
                code: 200,
                data: result
            }
        } else {
            return {
                success: false,
                message: 'verification failed',
                code: 401,
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error?.response?.data ? error?.response?.data?.message : 'verification failed',
            code: 401,
        }
    }



}

const resendToken = async (data) => {
    try {
        const result = await otpService.sendVerificationToken(data.phoneNumber)
        await db.User.update(
            { pinCode: result.data.pinId },
            {
                where: {
                    phoneNumber: data.phoneNumber
                },
            },
        );
        return {
            success: true,
            message: 'Token sent',
            code: 200,
        }
    } catch (error) {
        return {
            success: false,
            message: 'Unable to send token at the moment',
            code: 500,
        }
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getSecurityQuestions,
    saveUserSecurityAnswer,
    verifyUserToken,
    resendToken
}