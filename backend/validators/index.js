const { validationResult } = require("express-validator");

// Import Validators
const user = require("./user");
const service = require("./service");
const banner = require("./banner");
const client = require("./client");
const contactForm = require("./contactForm");
const logo = require("./logo");

const validators = {
  user,
  service,
  banner,
  client,
  contactForm,
  logo
};

module.exports = {
  check(req, res, next) {
    let errors = validationResult(req).array();
    if (errors.length == 0) return next();
    let error = new Error(`${errors[0].path}: ${errors[0].msg}`);
    error.status = 422;
    throw error;
  },
  ...validators,
};