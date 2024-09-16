const sharp = require("sharp");
const fs = require("fs");

const methods = {
    async convertToWebP(inputPath, outputPath) {
        try {
            await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
            // Attempt to delete the original file using fs.unlink (asynchronous)
            fs.unlink(inputPath, (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
            return {
                path: outputPath,
            };
        } catch (err) {
            throw new Error(err.message);
        }
    },
};

module.exports = { ...methods };
