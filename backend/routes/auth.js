const express = require('express');
const router = express.Router();
const { authValidation } = require('../middlewares');
const { loginController, signupController } = require('../controllers');

router.post('/login', authValidation, loginController);
router.post('/signup', authValidation, signupController);

module.exports = router;