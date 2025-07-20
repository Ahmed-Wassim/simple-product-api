const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");

const app = express();
app.use(express.json());
require("dotenv").config();

connectDB();

app.get("/", (req, res) => {
  res.send("Ai products api is running");
});

app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
