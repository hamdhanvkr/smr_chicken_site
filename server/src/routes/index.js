const express = require("express");
const router = express.Router();

const testRoutes = require("./test");

router.use("/test", testRoutes);

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API is running"
    });
});

module.exports = router;