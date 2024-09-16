const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        type: { type: String },
        image: { type: String },
        imageAlt: { type: String },
    },
    { timestamps: true }
);

// Custom JSON Response
schema.methods.toJSON = function () {
    return {
        id: this._id,
        type: this.type,
        image: this.image,
        imageAlt: this.imageAlt,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

module.exports = mongoose.model("Logos", schema);
