const AboutUs = require("../../models/AboutUs.js");
const { ErrorBadRequest, ErrorNotFound } = require("../../configs/errorMethods");

const methods = {
    async findOne(req, res) {
        try {
            const obj = await AboutUs.findOne({ type: req.query.type });
            return obj;
        } catch (error) {
            return Promise.reject(ErrorNotFound(error.message));
        }
    },

    async update(req, res) {
        try {
            const obj = await AboutUs.findOne({ type: req.body.type });
            if (!obj) {
                const data = req.body;
                const obj = new AboutUs(data);
                const inserted = await obj.save();
                return inserted;
            } else {
                const data = req.body;
                await AboutUs.updateOne({ _id: obj._id }, data, {
                    runValidators: true,
                    new: true,
                });
                return Object.assign(obj, data);
            }
        } catch (error) {
            return Promise.reject(ErrorBadRequest(error.message));
        }
    },

};

module.exports = { ...methods };
