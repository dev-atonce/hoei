const Media = require("../../services/webpanel/mediaPanel.service");

const methods = {
    /////// Product Image ///////
    async onGetServiceById(req, res) {
        try {
            let result = await Media.findServiceById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onInsertService(req, res) {
        try {
            let result = await Media.insertService(req, res);
            res.success(result, 201);
        } catch (error) {
            res.error(error);
        }
    },
    /////// ///////////// ///////

    /////// Aboutus Image ///////
    async onGetAboutUsById(req, res) {
        try {
            let result = await Media.findAboutUsById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onInsertAboutUs(req, res) {
        try {
            let result = await Media.insertAboutUs(req, res);
            res.success(result, 201);
        } catch (error) {
            res.error(error);
        }
    },
    /////// ///////////// ///////

    /////// Home Image ///////
    async onGetHomeById(req, res) {
        try {
            let result = await Media.findHomeById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onInsertHome(req, res) {
        try {
            let result = await Media.insertHome(req, res);
            res.success(result, 201);
        } catch (error) {
            res.error(error);
        }
    },
    /////// ///////////// ///////

    async onDeleteMedia(req, res) {
        try {
            await Media.deleteMedia(req, res);
            res.success("success", 204);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
