const cors = require("cors");
const whitelistSetting = {
  production: [""],
  development: [""],
};
const whitelist = whitelistSetting[process.env.NODE_ENV] || [];
const corsOptions = {
  origin: function (origin, callback) {
    if (!whitelist.length || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = {
  uploadCors: cors(corsOptions),
};
