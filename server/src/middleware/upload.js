const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(process.cwd(), "uploads");

console.log("process.cwd():", process.cwd());
console.log("uploadDir:", uploadDir);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log("Saving file to:", uploadDir);
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        console.log("Filename:", filename);
        cb(null, filename);
    }
});

module.exports = multer({ storage });