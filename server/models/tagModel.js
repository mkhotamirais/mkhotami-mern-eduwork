const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      minLength: [3, "Panjang tag minimal 3 huruf"],
      maxLength: [50, "Panjang tag maksimal 3 huruf"],
      required: [true, "Nama kategori harus diisi"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tag", tagSchema);
