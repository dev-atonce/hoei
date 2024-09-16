const Seo = require("../../services/page/seoPage.service");

const methods = {
  async onGetByPageName(req, res) {
    try {
      let result = await Seo.findByPageName(req.params.pagename);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...methods };
