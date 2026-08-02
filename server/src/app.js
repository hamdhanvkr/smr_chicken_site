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

// ===========================
// Static Uploads
// ===========================
const uploadsPath = path.join(__dirname, "../uploads");

console.log("Uploads folder:", uploadsPath);

app.use("/uploads", express.static(uploadsPath));
// ===========================
// API Routes
// ===========================
const adminRoutes = require("./routes/admin");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/orders");

app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ===========================
// React Build Paths
// ===========================
const clientBuildPath = path.join(__dirname, "../public/client/dist");
const adminBuildPath = path.join(__dirname, "../public/admin/dist");

// Client
app.use(express.static(clientBuildPath));


// Admin
app.use("/adminportal", express.static(adminBuildPath));

// Admin React
app.get("/adminportal/*", (req, res) => {
    res.sendFile(path.join(adminBuildPath, "index.html"));
});

// Client React
app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

module.exports = app;