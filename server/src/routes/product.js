const express = require("express");
const router = express.Router();

const pool = require("../config/database");


// Get all products
router.get("/", async (req, res) => {
    try {

        const [products] = await pool.query(
            "SELECT * FROM products"
        );

        res.json({
            success: true,
            products
        });

    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
});


module.exports = router;