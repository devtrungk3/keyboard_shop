const {Account} = require('../models');
const jwtUtil = require('../jwtUtil');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const loginController = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    
    // get account information from database
    const account = await Account.findOne({
        where: { username },
        attributes: ['accountId', 'username', 'password', 'role'],
    });

    // check wrong credentials
    if (!account) {
        res.status(401);
        throw new Error('Username or password is wrong');
    } else {
        const match = await bcrypt.compare(password, account.password);
        if (!match) {
            res.status(401);
            throw new Error('Username or password is wrong');
        }
    }
    
    // create new access token using credentials
    const accessToken = jwtUtil.generateAccessToken({
        accountId: account.accountId,
        username: account.username,
        role: account.role
    });
    res.json({accessToken});
});

const signupController = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    const role = "user";

    // check data exists in database
    const accountExists = await Account.findOne({where: {username: username}});
    if (accountExists) {
        res.status(409);
        throw new Error('Username already in use');
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new records into users table
    await Account.create({
        username,
        password: hashedPassword,
        role,
    });

    const account = await Account.findOne({
        where: {username},
        attributes: ['accountId', 'username', 'role'],
    });

    /**
     * create new access token using credentials
     */
    const accessToken = jwtUtil.generateAccessToken({
        accountId: account.accountId,
        username: account.username,
        role: account.role
    });

    res.json({accessToken});
});

module.exports = {loginController, signupController};