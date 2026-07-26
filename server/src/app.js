const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
}));

app.use(express.json());

// ===========================
// Static Uploads
// ===========================
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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
const clientBuildPath = path.join(__dirname, "../public/client");
const adminBuildPath = path.join(__dirname, "../public/admin");

// Static Files
app.use(express.static(clientBuildPath));
app.use("/admin", express.static(adminBuildPath));

// ===========================
// React Routes
// ===========================

// Admin React
app.get("/admin/*", (req, res) => {
    res.sendFile(path.join(adminBuildPath, "index.html"));
});

// Customer React
app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
});

module.exports = app;