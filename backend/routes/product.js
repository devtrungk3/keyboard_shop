const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const {verifyJWT} = require('../middlewares');

router.get("/", verifyJWT, productController.getAllProducts)
router.post("/create", verifyJWT, productController.addNewProduct);
router.put("/:id", verifyJWT, productController.updateProduct);
router.delete("/:id", verifyJWT, productController.deleteProduct);

module.exports = router;


