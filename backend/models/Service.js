const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    serviceNameTH: { type: String },
    serviceDetailTH: { type: String },
    image: { type: String },
    imageAlt: { type: String },
    gallery: { type: Array },
    sort: { type: Number },
    status: { type: Boolean, default: false },
    serviceSeo: {
      titleTH: { type: String },
      keywordTH: { type: String },
      descriptionTH: { type: String },
    },
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator);

schema.pre("save", async function (next) {
  if (!this.sort) {
    try {
      const maxSort = await this.constructor.findOne().sort("-sort").exec();
      this.sort = maxSort ? maxSort.sort + 1 : 0;
      next();
    } catch (error) {
      next(error);
    }
  }
});

// Custom JSON Response
schema.methods.toJSON = function () {
  return {
    id: this._id,
    serviceNameTH: this.serviceNameTH,
    serviceDetailTH: this.serviceDetailTH,
    image: this.image,
    imageAlt: this.imageAlt,
    gallery: this.gallery,
    sort: this.sort,
    status: this.status,
    serviceSeo: {
      titleTH: this.serviceSeo["titleTH"],
      keywordTH: this.serviceSeo["keywordTH"],
      descriptionTH: this.serviceSeo["descriptionTH"],
    },
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("Services", schema);
