const express = require("express");
require('dotenv').config();
const { sequelize, Account, Brand, Product } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", (req, res) => {
  res.send("hello world");
});
// Sync database and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    // Sync all models with database
    await sequelize.sync({ force: true }); // force: true drops table if it exists
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
startServer();