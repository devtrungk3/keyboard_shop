const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand');
const {verifyJWT} = require('../middlewares');

router.post("/create", brandController.addNewBrand);
router.get("/", brandController.getAllBrands);
router.put("/:id", brandController.updateBrand);
router.delete("/:id", brandController.deleteBrand);
module.exports = router;

