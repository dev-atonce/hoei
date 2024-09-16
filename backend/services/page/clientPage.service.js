const Client = require("../../models/Client");
const { ErrorBadRequest } = require("../../configs/errorMethods");

const methods = {
    async find(req) {
        try {
            const rows = await Client.find({ status: true }).sort({ sort: "asc" });
            const count = await Client.countDocuments({ status: true });
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
