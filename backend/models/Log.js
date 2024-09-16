const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema(
  {
    itemId: { type: String },
    userId: { type: String },
    type: { type: String },
    activity: { type: String },
  },
  { timestamps: true }
);

// schema.plugin(uniqueValidator);

// Custom JSON Response
schema.methods.toJSON = function () {
  return {
    id: this._id,
    itemId: this.itemId,
    userId: this.userId,
    type: this.type,
    activity: this.activity,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("Logs", schema);
