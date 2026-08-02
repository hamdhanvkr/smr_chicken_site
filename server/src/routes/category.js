const express = require("express");
const pool = require("../config/database");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM categories ORDER BY id DESC"
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

router.post(
    "/",
    upload.single("image"),
    async (req, res) => {


        try {


            const { name, status } = req.body;


            const image = req.file
                ? req.file.filename
                : null;



            await pool.query(

                "INSERT INTO categories(name,image,status) VALUES(?,?,?)",

                [
                    name,
                    image,
                    status
                ]

            );



            res.json({

                success: true,
                message: "Category Added Successfully"

            });


        }
        catch (error) {

            console.error("CATEGORY UPLOAD ERROR:", error);

            res.status(500).json({
                success: false,
                message: error.message,
                stack: error.stack
            });

        }

    });

router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [rows] = await pool.query(
            "SELECT * FROM categories WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

router.put(
    "/:id",
    upload.single("image"),
    async (req, res) => {


        try {


            const { name, status } = req.body;

            const { id } = req.params;


            let query;
            let values;


            if (req.file) {


                query =
                    `
UPDATE categories
SET name=?, image=?, status=?
WHERE id=?
`;


                values = [
                    name,
                    req.file.filename,
                    status,
                    id
                ];


            }
            else {


                query =
                    `
UPDATE categories
SET name=?, status=?
WHERE id=?
`;


                values = [
                    name,
                    status,
                    id
                ];


            }



            await pool.query(query, values);



            res.json({

                success: true,
                message: "Category Updated"

            });


        }
        catch (error) {

            console.log(error);

            res.status(500).json({
                message: error.message
            });

        }


    });

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM categories WHERE id=?",
            [id]
        );

        res.json({
            success: true,
            message: "Category Deleted Successfully"
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