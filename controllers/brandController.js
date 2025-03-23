const Brand = require("../models/brand");


const getAllBrand = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json({
            message: 'All brands',
            data: brands
        });
    } catch (error) {
        console.log("Error getting brand", error);
        res.status(500).json({
            message: "Error getting brand",
            detail: error.message,
        });
    }
}
const addNewBrand = async (req, res) => {
    const {brandName, description} = req.body;

    try {
        const newBrand = await Brand.create({
            brandName,
            description,
        });
        res.status(200).json({
            message: "Brand created successfully",
            brand: newBrand,
        });
        console.log("Added new brand: ", newBrand);
    } catch (error) {
        console.log("Error adding brand", error);
        res.status(500).json({
            message: "Error adding brand",
            detail: error.message,
        });
    }
};

module.exports = {addNewBrand, getAllBrand};

