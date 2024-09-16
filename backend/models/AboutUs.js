const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    aboutUsTH: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

// Custom JSON Response
schema.methods.toJSON = function () {
  return {
    id: this._id,
    aboutUsTH: this.aboutUsTH,
    type: this.type,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("AboutUs", schema);
