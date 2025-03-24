const asyncHandler = require('express-async-handler');
const authValidation = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body;

    // check missing data
    if (!username) {
        res.status(400);
        throw new Error('Missing username');
    }
    if (!password) {
        res.status(400);
        throw new Error('Missing password');
    }
    // check data length
    if (username && (username.length < 5 || username.length > 255)) {
        res.status(400);
        throw new Error('Username must be between 5 - 255 characters');
    }
    if (password && (password.length < 5 || password.length > 255)) {
        res.status(400);
        throw new Error('Password must be between 5 - 255 characters');
    }
    // check data format
    if (!/^[a-zA-Z][a-zA-Z0-9/]+$/.test(username)) {
        res.status(400);
        throw new Error('Username must follow specified format a-z, A-Z, 0-9');
    }
    if (!/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/.test(password)) {
        res.status(400);
        throw new Error('Password must follow specified format a-z, A-Z, 0-9, !@#$%^&*()_+=-.');
    }
    next();
})

module.exports = authValidation;