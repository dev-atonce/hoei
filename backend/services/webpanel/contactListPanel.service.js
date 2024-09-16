const ContactList = require("../../models/ContactList");
const { ErrorBadRequest, ErrorNotFound } = require("../../configs/errorMethods");

const methods = {
  async findOne(req, res) {
    try {
      const obj = await ContactList.findOne();
      return obj;
    } catch (error) {
      return Promise.reject(ErrorNotFound(error.message));
    }
  },

  async update(req, res) {
    try {
      const obj = await ContactList.findOne();
      if (!obj) {
        const data = req.body;
        const obj = new ContactList(data);
        const inserted = await obj.save();
        return inserted;
      } else {
        const data = req.body;
        await ContactList.updateOne({ _id: obj._id }, data, { runValidators: true, new: true });
        return Object.assign(obj, data);
      }
    } catch (error) {
      return Promise.reject(ErrorBadRequest(error.message));
    }
  },
  
};

module.exports = { ...methods };
