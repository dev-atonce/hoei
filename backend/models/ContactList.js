const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    nameTH: { type: String },
    addressTH: { type: String },
    gMap: { type: String },
    telephone: { type: String },
    fax: { type: String },
    email: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    line: { type: String },
    line2: { type: String },
    whatsapp: { type: String },
  },
  { timestamps: true }
);

// Custom JSON Response
schema.methods.toJSON = function () {
  return {
    id: this._id,
    nameTH: this.nameTH,
    addressTH: this.addressTH,
    gMap: this.gMap,
    telephone: this.telephone,
    fax: this.fax,
    email: this.email,
    facebook: this.facebook,
    instagram: this.instagram,
    line: this.line,
    line2: this.line2,
    whatsapp: this.whatsapp,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("Contact_lists", schema);
