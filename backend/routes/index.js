const express = require('express');
const router = express.Router();
const {verifyJWT} = require('../middlewares');

const authRouter = require('./auth');
const accountRouter = require('./account');

const brandRouter = require('./brand');
const productRouter = require('./product');

router.use('/auth', authRouter);
router.use('/account', verifyJWT, accountRouter);
router.use('/brand', verifyJWT, brandRouter);
// router.use('/product', verifyJWT, productRouter);
router.use('/product', productRouter);

module.exports = router;