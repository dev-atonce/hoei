const ContactList = require("../../services/page/contactListPage.service");

const methods = {
    async onGet(req, res) {
        try {
            let result = await ContactList.findOne();
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
