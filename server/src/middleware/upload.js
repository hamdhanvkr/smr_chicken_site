const multer = require("multer");
const path = require("path");

const uploadsPath = require("../config/uploads");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadsPath);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);
    }

});

const upload = multer({
    storage: storage
});

module.exports = upload;