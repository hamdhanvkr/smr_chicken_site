const express = require("express");
const pool = require("../config/database");
const upload = require("../middleware/upload");

const router = express.Router();


// ===============================
// Get All Products
// ===============================
router.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT
                p.*,
                c.name AS category_name
            FROM products p
            LEFT JOIN categories c
            ON p.category_id = c.id
            ORDER BY p.id DESC
        `);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});


// ===============================
// Get Single Product
// ===============================
router.get("/:id", async (req, res) => {

    try {

        const [rows] = await pool.query(
            `
            SELECT
                p.*,
                c.name AS category_name
            FROM products p
            LEFT JOIN categories c
            ON p.category_id = c.id
            WHERE p.id = ?
            `,
            [req.params.id]
        );


        res.json(rows[0]);


    } catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server Error"
        });

    }

});


// ===============================
// Add Product
// ===============================
router.post("/", upload.single("image"), async (req, res) => {

    try {

        const {
            category_id,
            name,
            price,
            description,
            status
        } = req.body;

        const image = req.file ? req.file.filename : null;

        await pool.query(
            `INSERT INTO products
            (category_id,name,price,image,description,status)
            VALUES (?,?,?,?,?,?)`,
            [
                category_id,
                name,
                price,
                image,
                description,
                status
            ]
        );

        res.json({
            success: true,
            message: "Product Added Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});


// ===============================
// Update Product
// ===============================
router.put("/:id", upload.single("image"), async (req, res) => {

    try {

        const {
            category_id,
            name,
            price,
            description,
            status
        } = req.body;

        if (req.file) {

            await pool.query(
                `UPDATE products
                SET category_id=?,
                    name=?,
                    price=?,
                    image=?,
                    description=?,
                    status=?
                WHERE id=?`,
                [
                    category_id,
                    name,
                    price,
                    req.file.filename,
                    description,
                    status,
                    req.params.id
                ]
            );

        } else {

            await pool.query(
                `UPDATE products
                SET category_id=?,
                    name=?,
                    price=?,
                    description=?,
                    status=?
                WHERE id=?`,
                [
                    category_id,
                    name,
                    price,
                    description,
                    status,
                    req.params.id
                ]
            );

        }

        res.json({
            success: true,
            message: "Product Updated Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});


// ===============================
// Delete Product
// ===============================
router.delete("/:id", async (req, res) => {

    try {

        await pool.query(
            "DELETE FROM products WHERE id=?",
            [req.params.id]
        );

        res.json({
            success: true,
            message: "Product Deleted Successfully"
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