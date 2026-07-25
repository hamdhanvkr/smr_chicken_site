const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.get("/db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT NOW() AS current_time");

        res.json({
            success: true,
            message: "Database Connected",
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;