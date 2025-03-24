const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const accountRouter = require('./account');

const brandRouter = require('./brand');
const productRouter = require('./product');

router.use('/auth', authRouter);
router.use('/account', accountRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);

module.exports = router;