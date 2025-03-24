const jwt = require('jsonwebtoken');

/**
 * function to generate JWT access token
 */
const generateAccessToken = (payload) => {
    return jwt.sign(
        {...payload},
        process.env.SECRET_ACCESS_KEY,
        {
            expiresIn: '12h',
        }
    );
}

module.exports = { generateAccessToken }