const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://smrchicken.com",
        "https://www.smrchicken.com"
    ],
    credentials: true
}));

app.use(express.json());

// ====================================
// Uploads Folder
// ====================================

const uploadPath = path.resolve(process.cwd(), "uploads");

console.log("Uploads Path:", uploadPath);

app.use("/uploads", express.static(uploadPath));

// ====================================
// API Routes
// ====================================

const adminRoutes = require("./routes/admin");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/orders");

app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ====================================
// React Build
// ====================================

const clientBuildPath = path.join(process.cwd(), "public/client/dist");
const adminBuildPath = path.join(process.cwd(), "public/admin/dist");

app.use(express.static(clientBuildPath));

app.use("/adminportal", express.static(adminBuildPath));

app.get("/adminportal/*", (req, res) => {
    res.sendFile(path.join(adminBuildPath, "index.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

module.exports = app;