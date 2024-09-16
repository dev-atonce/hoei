const Banner = require("../../models/Banner");

const { ErrorBadRequest } = require("../../configs/errorMethods");

const methods = {
    async find(req) {
        try {
            const rows = await Banner.find({ status: true }).sort({ sort: "asc" });
            const count = await Banner.countDocuments({ status: true });
            return {
                total: count,
                rows: rows,
            };
        } catch (error) {
            return Promise.reject(ErrorBadRequest(error.message));
        }
    },
};

module.exports = { ...methods };
