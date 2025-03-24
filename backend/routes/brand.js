const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand');


router.post("/create", brandController.addNewBrand);
router.get("/", brandController.getAllBrand);
router.put("/:id", brandController.updateBrand);
router.delete("/:id", brandController.deleteBrand);
module.exports = router;

