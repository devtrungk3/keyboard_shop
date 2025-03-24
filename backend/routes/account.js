const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middlewares');
const { getInfo } = require('../controllers');

router.get('/',  getInfo);

module.exports = router;