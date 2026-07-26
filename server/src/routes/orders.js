const express = require("express");
const pool = require("../config/database");

const router = express.Router();

// Get All Orders
router.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM orders ORDER BY id DESC"
        );

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;