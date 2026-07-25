const express = require("express");

const app = express();

app.use(express.json());


const productRoutes = require("./routes/product");


app.use("/api/products", productRoutes);


module.exports = app;