const ContactList = require("../../models/ContactList");
const { ErrorBadRequest } = require("../../configs/errorMethods");

const methods = {
    async findOne() {
        try {
            const rows = await ContactList.findOne();
            return rows;
        } catch (error) {
            return Promise.reject(ErrorBadRequest(error.message));
        }
    },
};

module.exports = { ...methods };
