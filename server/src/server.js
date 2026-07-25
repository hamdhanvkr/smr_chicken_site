require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");
const initDatabase = require("./config/initDatabase");

const PORT = process.env.PORT || 5000;

console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD ? "YES" : "NO"
});

async function startServer() {

    await initDatabase();

    try {
        const connection = await pool.getConnection();
        console.log("MySQL Connected");
        connection.release();

    } catch(error) {
        console.error("Database Connection Failed:", error.message);
    }


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();