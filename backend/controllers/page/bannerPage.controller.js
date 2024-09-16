const Banner = require("../../services/page/bannerPage.service");

const methods = {
    async onGet(req, res) {
        try {
            let result = await Banner.find(req);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
