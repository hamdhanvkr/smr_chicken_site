const path = require("path");
const fs = require("fs");

const uploadsPath = process.env.UPLOADS_PATH
    ? path.resolve(process.env.UPLOADS_PATH)
    : path.join(process.env.HOME, "smr-uploads");

if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, {
        recursive: true
    });
}

console.log("=================================");
console.log("UPLOADS PATH:", uploadsPath);
console.log("=================================");

module.exports = uploadsPath;