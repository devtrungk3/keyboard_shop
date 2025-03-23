const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Brand = sequelize.define('Brand', {
    brandId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    tableName: 'brands'
});

module.exports = Brand;
