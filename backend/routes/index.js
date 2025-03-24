const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const accountRouter = require('./account');

router.use('/auth', authRouter);
router.use('/account', accountRouter);

module.exports = router;