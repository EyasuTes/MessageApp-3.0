const mongoose = require("mongoose");

const contactModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    phone: { type: "String", require: true },
    name: { type: "String", unique: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactModel);

module.exports = Contact;
