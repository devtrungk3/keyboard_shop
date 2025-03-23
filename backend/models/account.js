const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Account = sequelize.define('Account', {
    accountId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    timestamps: true,
    tableName: 'accounts'
});

module.exports = Account;
