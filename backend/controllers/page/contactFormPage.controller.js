const contactForm = require("../../services/page/contactFormPage.service");

const methods = {
    async send(req, res) {
        try {
            let result = await contactForm.sendEmail(req);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },
};

module.exports = { ...methods };
