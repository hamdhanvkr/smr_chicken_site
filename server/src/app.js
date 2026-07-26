const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
    origin:[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials:true
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const adminRoutes = require("./routes/admin");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/orders");




app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);



module.exports = app;