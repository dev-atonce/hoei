const Banner = require("../../services/webpanel/contactFormPanel.service");

const methods = {
    async onGetAll(req, res) {
        try {
            let result = await Banner.findAll(req);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onGetById(req, res) {
        try {
            let result = await Banner.findById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onUpdateStatus(req, res) {
        try {
            const result = await Banner.updateStatus(req, res);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onDelete(req, res) {
        try {
            const result = await Banner.delete(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
