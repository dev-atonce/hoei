const Seo = require("../../models/Seo");
const config = require("../../configs/app");
const {
  ErrorBadRequest,
  ErrorNotFound,
} = require("../../configs/errorMethods");

const methods = {
  async find(req) {
    const limit = +(req.query.size || config.pageLimit);
    const offset = +(limit * ((req.query.page || 1) - 1));

    try {
      const rows = await Seo.find().limit(limit).skip(offset);
      const count = await Seo.countDocuments();
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

  async update(id, data) {
    try {
      const obj = await Seo.findById(id);
      if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
      await Seo.updateOne({ _id: id }, data);
      return Object.assign(obj, data);
    } catch (error) {
      return Promise.reject(ErrorBadRequest(error.message));
    }
  },
};

module.exports = { ...methods };
