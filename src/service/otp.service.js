const axios = require('axios')

class TokenService {
    async sendVerificationToken(phoneNumber) {
        var data = {
            "api_key": "TLO99JiZrUtinlp6rE6P4MiduNQ4vqOGQsHRY0Fc9emJfz69vmkXB8mrqH8kVg",
            "message_type": "NUMERIC",
            "to": phoneNumber,
            "from":"N-Alert",
            "channel": "generic",
            "pin_attempts": 10,
            "pin_time_to_live": 5,
            "pin_length": 6,
            "pin_placeholder": "< 1234 >",
            "message_text": "Your pin is < 1234 >",
            "pin_type": "NUMERIC"
        };
        const result = await axios({
            method: 'post',
            url: 'https://api.ng.termii.com/api/sms/otp/send',
            data: {
                ...data
            }
        });
        return result
    }
    async verifyToken(token, pinId) {
        const result = await axios({
            method: 'post',
            url: `https://api.ng.termii.com/api/sms/otp/verify`,
            data: {
                api_key: "TLO99JiZrUtinlp6rE6P4MiduNQ4vqOGQsHRY0Fc9emJfz69vmkXB8mrqH8kVg",
                pin: token,
                pin_id: pinId
            }
        });
        return result
    }
}

module.exports = new TokenService()