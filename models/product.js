const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('Product', {
    productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'brands',
          key: 'brandId'
        }
    }
}, {
    timestamps: true,
    tableName: 'products',
});
module.exports = Product;
