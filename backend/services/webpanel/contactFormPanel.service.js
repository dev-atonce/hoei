const ContactForm = require("../../models/ContactForm.js");
const config = require("../../configs/app.js");
const { ErrorBadRequest, ErrorNotFound } = require("../../configs/errorMethods");

const methods = {
    async findAll(req) {
        const limit = +(config.pageLimit);
        const offset = +(limit * ((req.query.page || 1) - 1));
        try {
            const rows = await ContactForm.find().sort({ sort: "asc" })
                .limit(limit)
                .skip(offset);
            const count = await ContactForm.countDocuments();
            return {
                total: count,
                lastPage: Math.ceil(count / limit),
                currPage: +req.query.page || 1,
                rows: rows,
            };
        } catch (error) {
            return Promise.reject(ErrorBadRequest(error.message));
        }
    },

    async findById(id) {
        try {
            const obj = await ContactForm.findById(id);
            if (!obj) return Promise.reject(ErrorNotFound("id: not found"));
            return obj;
        } catch (error) {
            return Promise.reject(ErrorBadRequest(error.message));
        }
    },

    async updateStatus(req, res) {
        try {
            const obj = await ContactForm.findOneAndUpdate({_id: req.params.id}, { status: req.body.status }, { new: true });
            return obj;
        } catch (error) {
            return Promise.reject(ErrorBadRequest(error.message));
        }
    },

    async delete(id) {
        try {
            await ContactForm.findOneAndDelete({ _id: id }).exec();
            return { msg: "deleted success" };
        } catch (error) {
            return Promise.reject(ErrorBadRequest(error.message));
        }
    },
};

module.exports = { ...methods };
