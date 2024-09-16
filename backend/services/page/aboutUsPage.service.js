const AboutUs = require("../../models/AboutUs");
const { ErrorBadRequest } = require("../../configs/errorMethods");

const methods = {
    async find(req) {
        try {
            const rows = await AboutUs.findOne({ type: req.params.type });
            return rows;
        } catch (error) {
            return Promise.reject(ErrorBadRequest(error.message));
        }
    },
};

module.exports = { ...methods };
