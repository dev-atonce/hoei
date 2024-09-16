const fs = require("fs");

const method = {
  ensureDirectoryExistence(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  },
};

module.exports = { ...method };
