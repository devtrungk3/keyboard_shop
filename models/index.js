const sequelize = require('../database');
const Account = require('./account');
const Brand = require('./brand');
const Product = require('./product');

// Define relationships
Brand.hasMany(Product, {
  foreignKey: 'brandId',
  as: 'products'
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