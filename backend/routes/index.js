const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const accountRouter = require('./account');

const brandRouter = require('./brands');

router.use('/auth', authRouter);
router.use('/account', accountRouter);

module.exports = router;