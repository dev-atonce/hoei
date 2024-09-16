const ContactList = require("../../services/webpanel/contactListPanel.service");

const methods = {
  async onGetOne(req, res) {
    try {
      let result = await ContactList.findOne(req);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },
  
  async onUpdate(req, res) {
    try {
      const result = await ContactList.update(req, res);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

};

module.exports = { ...methods };
