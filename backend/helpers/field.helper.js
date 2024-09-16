const { ErrorBadRequest } = require("../configs/errorMethods");

const method = {
  checkAllowFields(body, allowFields) {
    // Extract keys from the body object and check if any key is not in allowFields
    // If not in allowFields return "true"
    if (Object.keys(body).some((v) => !allowFields.includes(v))) { 
      // If any key is not allowed, throw an error
      throw ErrorBadRequest("Some Field Not Allowed");
    }
  },
};

module.exports = { ...method };
