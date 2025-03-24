const Brand = require("../models/brand");

const handleErrorResponse = (res, error, message) => {
    console.error(`${message}:`, error);
    res.status(500).json({
        message,
        detail: error.message,
    });
};

const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json({
            message: "All brands",
            data: brands,
        });
    } catch (error) {
        handleErrorResponse(res, error, "Error getting brands");
    }
};

const addNewBrand = async (req, res) => {
    const {brandName, description} = req.body;

    try {
        const [newBrand, created] = await Brand.findOrCreate({
            where: {brandName},
            defaults: {brandName, description},
        });

        if (!created) {
            return res.status(400).json({
                message: "Brand name already exists",
            });
        }

        res.status(201).json({
            message: "Brand added successfully",
            data: newBrand,
        });

    } catch (error) {
        handleErrorResponse(res, error, "Error adding brand");
    }
};

const updateBrand = async (req, res) => {
    const {id} = req.params;
    const {brandName, description} = req.body;

    try {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({message: "Brand not found"});
        }
        brand.brandName = brandName;
        brand.description = description;
        await brand.save();

        res.status(200).json({
            message: "Brand updated successfully",
            data: brand,
        });
    } catch (error) {
        handleErrorResponse(res, error, "Error updating brand");
    }
};

const deleteBrand = async (req, res) => {
    const {id} = req.params;

    try {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({message: "Brand not found"});
        }
        await brand.destroy();
        res.status(200).json({
            message: "Brand deleted successfully",
            data: brand,
        });
    } catch (error) {
        handleErrorResponse(res, error, "Error deleting brand");
    }
};

module.exports = {
    getAllBrands,
    addNewBrand,
    updateBrand,
    deleteBrand,
};