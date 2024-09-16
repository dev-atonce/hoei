const multer = require("multer");
const path = require("path");
const config = require("../configs/app.js");

const methods = {
    createUploader(destination, filenameFn) {
        // Set storage engine
        const storage = multer.diskStorage({
            destination: destination,
            filename: filenameFn,
        });

        // Initialize upload
        const upload = multer({
            storage: storage,
            limits: { fileSize: config.limitFileSize }, // Limit file size to 2MB
            fileFilter: function (req, file, cb) {
                methods.checkFileType(file, cb);
            },
        });

        return upload;
    },

    // Check file type
    checkFileType(file, cb) {
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
        // Check ext
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        // Check mime
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Images Only!");
        }
    },
};

module.exports = { ...methods };
