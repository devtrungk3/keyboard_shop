const {Product, Brand} = require('../models');
const handleErrorResponse = (res, error, message) => {
    console.error(`${message}:`, error);
    res.status(500).json({
        message,
        detail: error.message,
    });
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Brand,
                as: "brands",
                attributes: ['brandId', 'brandName'],
            }
        });
        res.status(200).json({
            message: "All products",
            data: products,
        });
    } catch (error) {
        handleErrorResponse(res, error, "Error getting products");
    }
}

const addNewProduct = async (req, res) => {
    const {productName, description, price, quantity, imageUrl, brandId} = req.body;
    try {
        const brand = await Brand.findByPk(brandId);
        if (!brand) {
            return res.status(400).json({
                message: "Brand not found"
            });
        }

        const newProduct = await Product.create({
            productName,
            description,
            price,
            quantity,
            imageUrl,
            brandId,
        });

        res.status(200).json({
            message: "Brand added successfully",
            data: newProduct,
        });
    } catch (error) {
        handleErrorResponse(res, error, "Error adding product");
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {brandName, description, price, quantity, imageUrl, brandId} = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            })
        }

        const brand = await Brand.findByPk(brandId);
        if (!brand) {
            return res.status(400).json({
                message: "Brand not found"
            })
        }

        product.brandName = brandName;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.imageUrl = imageUrl;
        product.brandId = brandId;
        await product.save();

        res.status(200).json({
            message: "Product updated",
            data: product,
        });
    } catch (error) {
        handleErrorResponse(res, error, "Error updating product");
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            })
        }
        await product.destroy();
        res.status(200).json({
            message: "Product deleted",
            data: product,
        })
    } catch (error) {
        handleErrorResponse(res, error, "Error deleting product");
    }
}

module.exports = {
    getAllProducts,
    addNewProduct,
    updateProduct,
    deleteProduct,
}
