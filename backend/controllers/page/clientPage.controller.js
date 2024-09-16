const Client = require("../../services/page/clientPage.service");

const methods = {
  async onGet(req, res) {
    try {
      let result = await Client.find(req);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...methods };
