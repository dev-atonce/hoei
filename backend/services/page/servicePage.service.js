const Service = require("../../models/Service");
const config = require("../../configs/app");

const { ErrorNotFound } = require("../../configs/errorMethods");

const methods = {
  async find(req) {
    const limit = +(config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));
    try {
      const rows = await Service.find({ status: true })
        .sort({ sort: "asc" })
        .limit(limit)
        .skip(offset);
      const count = await Service.countDocuments({ status: true });
      return {
        total: count,
        lastPage: Math.ceil(count / limit),
        currPage: +req.query.page || 1,
        rows: rows,
      };
    } catch (error) {
      return Promise.reject(ErrorNotFound(error.message));
    }
  },

  async findById(id) {
    try {
      const obj = await Service.findById(id);
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      return obj;
    } catch (error) {
      return Promise.reject(ErrorNotFound("id: not found"));
    }
  },
};

module.exports = { ...methods };
