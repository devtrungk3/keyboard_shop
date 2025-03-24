const sequelize = require('../database');
const Account = require('./account');
const Brand = require('./brand');
const Product = require('./product');

Brand.hasMany(Product, {
    foreignKey: 'brandId',
    as: 'products',
    onDelete: 'CASCADE',
    hooks: true
});

Product.belongsTo(Brand, {
    foreignKey: 'brandId',
    as: 'brands'
});


module.exports = {
    sequelize,
    Account,
    Brand,
    Product,
};