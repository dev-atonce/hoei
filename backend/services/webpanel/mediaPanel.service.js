const config = require("../../configs/app");
const fs = require("fs/promises");
const multer = require("multer");
const { ensureDirectoryExistence } = require("../../helpers/checkDirectory.helper");
const { ErrorBadRequest, ErrorNotFound } = require("../../configs/errorMethods");

const methods = {
    /////// Service Image ///////
    async findServiceById(id) {
        const _id = id;
        const dirPath = `./public/image/service/${_id}`;
        const imagePath = [];
        try {
            // Check if the directory exists
            await fs.access(dirPath);
            // Read the directory contents
            const files = await fs.readdir(dirPath);
            files.map((file) => {
                imagePath.push(`${config.baseUrl}/public/image/service/${_id}/${file}`);
            });
            return { data: imagePath, total: imagePath.length };
        } catch (error) {
            // If the error is about directory not existing, return an empty array
            if (error.code === 'ENOENT') {
                return { data: [], total: 0 };
            }
            // For other errors, reject with an error message
            return Promise.reject(ErrorNotFound("Failed to read directory"));
        }
    },

    async insertService(req, res) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadDir = `./public/image/service/${req.params.id}`;
                ensureDirectoryExistence(uploadDir);
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            },
        });

        const upload = multer({
            storage: storage,
            limits: { fileSize: config.limitFileSize },
        }).array("image", 12);

        return new Promise((resolve, reject) => {
            upload(req, res, async (err) => {
                if (err) {
                    return reject(ErrorBadRequest(err));
                } else {
                    if (req.files === undefined) {
                        return reject(ErrorBadRequest('No file selected'));
                    } else {
                        const imagePath = req.files.map((file) => file.path);
                        resolve({ message: "File uploaded successfully", image: imagePath });
                    }
                }
            });
        });
    },
    /////// ///////////// ///////

    /////// Aboutus Image ///////
    async findAboutUsById() {
        const dirPath = `./public/image/about-us`;
        const imagePath = [];
        try {
            // Check if the directory exists
            await fs.access(dirPath);
            // Read the directory contents
            const files = await fs.readdir(dirPath);
            files.map((file) => {
                imagePath.push(`${config.baseUrl}/public/image/about-us/${file}`);
            });
            return { data: imagePath, total: imagePath.length };
        } catch (error) {
            // If the error is about directory not existing, return an empty array
            if (error.code === 'ENOENT') {
                return { data: [], total: 0 };
            }
            // For other errors, reject with an error message
            return Promise.reject(ErrorNotFound("Failed to read directory"));
        }
    },

    async insertAboutUs(req, res) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadDir = `./public/image/about-us`;
                ensureDirectoryExistence(uploadDir);
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            },
        });

        const upload = multer({
            storage: storage,
            limits: { fileSize: config.limitFileSize },
        }).array("image", 12);

        return new Promise((resolve, reject) => {
            upload(req, res, async (err) => {
                if (err) {
                    return reject(ErrorBadRequest(err));
                } else {
                    if (req.files === undefined) {
                        return reject(ErrorBadRequest('No file selected'));
                    } else {
                        const imagePath = req.files.map((file) => file.path);
                        resolve({ message: "File uploaded successfully", image: imagePath });
                    }
                }
            });
        });
    },
    /////// ///////////// ///////

    /////// Home Image ///////
    async findHomeById() {
        const dirPath = `./public/image/home`;
        const imagePath = [];
        try {
            // Check if the directory exists
            await fs.access(dirPath);
            // Read the directory contents
            const files = await fs.readdir(dirPath);
            files.map((file) => {
                imagePath.push(`${config.baseUrl}/public/image/home/${file}`);
            });
            return { data: imagePath, total: imagePath.length };
        } catch (error) {
            // If the error is about directory not existing, return an empty array
            if (error.code === 'ENOENT') {
                return { data: [], total: 0 };
            }
            // For other errors, reject with an error message
            return Promise.reject(ErrorNotFound("Failed to read directory"));
        }
    },

    async insertHome(req, res) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadDir = `./public/image/home`;
                ensureDirectoryExistence(uploadDir);
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            },
        });

        const upload = multer({
            storage: storage,
            limits: { fileSize: config.limitFileSize },
        }).array("image", 12);

        return new Promise((resolve, reject) => {
            upload(req, res, async (err) => {
                if (err) {
                    return reject(ErrorBadRequest(err));
                } else {
                    if (req.files === undefined) {
                        return reject(ErrorBadRequest('No file selected'));
                    } else {
                        const imagePath = req.files.map((file) => file.path);
                        resolve({ message: "File uploaded successfully", image: imagePath });
                    }
                }
            });
        });
    },
    /////// ///////////// ///////

    async deleteMedia(req, res) {
        const files = req.body.imagePath;
        try {
            const deletePromises = files.map(file => fs.unlink(file));
            // Wait for all delete operations to complete
            await Promise.all(deletePromises);
            return { message: 'Deleted Successfully !' };
        } catch (error) {
            if (error.code === 'ENOENT') {
                return Promise.reject(ErrorNotFound("Directory or images not found"));
            }
            return Promise.reject(ErrorBadRequest("Failed to delete images"));
        }
    },
};

module.exports = { ...methods };
