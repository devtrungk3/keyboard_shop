const Brand = require("../models/Brand");
const Product = require("../models/Product");

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
                attributes: ['brandName'],
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
    const {productName, description, price, quantity, imageUrl} = req.body;

}
