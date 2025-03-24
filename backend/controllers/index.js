const {loginController, signupController} = require('./auth');
const {getInfo} = require('./account');
const {getAllProducts, addNewProduct, updateProduct, deleteProduct} = require('./product');
const {getAllBrands, addNewBrand, updateBrand, deleteBrand} = require('./brand');

module.exports = {
    loginController,
    signupController,
    getInfo,
    getAllProducts,
    addNewProduct,
    updateProduct,
    deleteProduct,
    getAllBrands,
    addNewBrand,
    updateBrand,
    deleteBrand,
}


