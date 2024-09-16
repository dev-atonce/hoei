const Seo = require("../../models/Seo");
const config = require("../../configs/app");
const { ErrorNotFound } = require("../../configs/errorMethods");

const methods = {
  async findByPageName(name) {
    try {
      const obj = await Seo.findOne({ page: name });
      if (!obj) return Promise.reject(ErrorNotFound("page: not found"));
      return obj;
    } catch (error) {
      return Promise.reject(ErrorNotFound("page: not found"));
    }
  },
};

module.exports = { ...methods };
