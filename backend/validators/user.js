const { param, body } = require("express-validator");

module.exports = {
  findById: [param("id").notEmpty().withMessage("is empty")],

  create: [
    body("username").notEmpty().withMessage("is empty"),
    body("password").notEmpty().withMessage("is empty"),
    body("email").notEmpty().withMessage("is empty").isEmail().withMessage("Invalid email format"),
    body("role").notEmpty().withMessage("is empty"),
  ],

  update: [
    body("username").notEmpty().withMessage("is empty"),
    body("email").notEmpty().withMessage("is empty").isEmail().withMessage("Invalid email format"),
    body("role").notEmpty().withMessage("is empty"),
  ],

  deleteById: [
    param("id").notEmpty().withMessage("is empty")
  ],
};
