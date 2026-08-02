const pool = require("./database");

async function initDatabase() {
    try {




        await pool.query(`
           CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
        `);

        await pool.query(`
           CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    category_id INT NOT NULL,

    name VARCHAR(255) NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    image VARCHAR(255),

    description TEXT,

    status ENUM('Active','Inactive') DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id)
);
        `);


        await pool.query(`
           CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(150),
    phone VARCHAR(20),
    address TEXT,
    total DECIMAL(10,2),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    order_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
        `);
        await pool.query(`
          CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    product_name VARCHAR(255),
    price DECIMAL(10,2),
    quantity INT,
    subtotal DECIMAL(10,2)
);
        `);

        await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);


        console.log("Database tables checked/created successfully");

    } catch (error) {
        console.error("Database initialization failed:", error.message);
    }
}

module.exports = initDatabase;