const express = require("express");
const router = express.Router();

const pool = require("../config/database");

router.get("/test/db", async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT CURRENT_TIME() AS db_time"
        );

        res.json({
            success: true,
            result
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;