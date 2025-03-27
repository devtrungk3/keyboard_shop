const express = require("express");
require('dotenv').config();
const {sequelize, Account, Brand, Product} = require('./models');
const router = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/helloworld', (req, res) => {
    return res.json('hello world');
});
app.use(router);

// global error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({message: err.message});
});

// Sync database and start server
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully");
        // Sync all models with database
        await sequelize.sync({ force: false }); // force: true drops table if it exists
        console.log("Database synced successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

startServer();
