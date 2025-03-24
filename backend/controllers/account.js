const asyncHandler = require('express-async-handler');
const { Account } = require('../models');

/**
 * get information about account
 */
const getInfo = asyncHandler(async(req, res) => {
    const account = await Account.findOne({
        attributes: ['username', 'createdAt', 'updatedAt'],
        where: { accountId: req.account.accountId }
    });
    res.json(account);
});

module.exports = { getInfo }