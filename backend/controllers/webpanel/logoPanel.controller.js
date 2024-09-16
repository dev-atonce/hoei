const Logo = require("../../services/webpanel/logoPanel.service");

const methods = {
    async onGetAll(req, res) {
        try {
            let result = await Logo.findAll();
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onUpdate(req, res) {
        try {
            const result = await Logo.update(req, res);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onDelete(req, res) {
        try {
            const result = await Logo.delete(req.params.type);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
