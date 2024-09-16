const Seo = require("../../services/webpanel/seoPanel.service");
const { checkAllowFields } = require("../../helpers/field.helper");

const allowFields = {
  update: [
    "seoTitleTH",
    "seoTitleEN",
    "seoKeywordTH",
    "seoKeywordEN",
    "seoDescriptionTH",
    "seoDescriptionEN",
  ],
};
const methods = {
  async onGetAll(req, res) {
    try {
      let result = await Seo.find(req);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },

  async onUpdate(req, res) {
    try {
      checkAllowFields(req.body, allowFields.update);
      const result = await Seo.update(req?.params?.id, req.body);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...methods };
