const express = require("express");
const pool = require("../config/database");

const router = express.Router();

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const [rows] = await pool.query(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const admin = rows[0];

        if (password !== admin.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        res.json({
            success: true,
            message: "Login Successful",
            admin: {
                id: admin.id,
                email: admin.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

module.exports = router;