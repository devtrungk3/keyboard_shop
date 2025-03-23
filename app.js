const express = require("express");
require("dotenv").config();
const {sequelize, Account, Brand, Product} = require("./models");
const brandRoutes = require("./routes/brandRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/brands", brandRoutes);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connection established successfully");

        await sequelize.sync({force: false});
        console.log("Database synced successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

startServer();
