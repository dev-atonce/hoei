const Logo = require("../../services/page/logoPage.service");

const methods = {
    async onGet(req, res) {
        try {
            let result = await Logo.find(req);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
