const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');


router.post("/add-new-brand", brandController.addNewBrand);
router.get("/", brandController.getAllBrand);

module.exports = router;

