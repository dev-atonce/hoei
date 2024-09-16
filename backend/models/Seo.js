const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        page: { type: String },
        seoDescriptionTH: { type: String },
        seoDescriptionEN: { type: String },
        seoKeywordTH: { type: String },
        seoKeywordEN: { type: String },
        seoTitleTH: { type: String },
        seoTitleEN: { type: String },
    },
    { timestamps: true }
);

// Custom JSON Response
schema.methods.toJSON = function () {
    return {
        id: this._id,
        page: this.page,
        seoDescriptionTH: this.seoDescriptionTH,
        seoDescriptionEN: this.seoDescriptionEN,
        seoKeywordTH: this.seoKeywordTH,
        seoKeywordEN: this.seoKeywordEN,
        seoTitleTH: this.seoTitleTH,
        seoTitleEN: this.seoTitleEN,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

module.exports = mongoose.model("Seos", schema);
