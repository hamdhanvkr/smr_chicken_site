require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log("MySQL Connected");
        connection.release();
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
    }

    // Always start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();