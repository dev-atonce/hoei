const aboutUs = require("../../services/page/aboutUsPage.service");

const methods = {
    async onGet(req, res) {
        try {
            let result = await aboutUs.find(req);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
