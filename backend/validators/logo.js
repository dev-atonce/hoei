const { param } = require("express-validator");

module.exports = {
  type: [param("type").notEmpty().withMessage("is empty")],
};
