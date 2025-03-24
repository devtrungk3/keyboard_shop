const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.get("/", productController.getAllProducts)
router.post("/create", productController.addNewProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;


