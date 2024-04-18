const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "nama kategori harus diisi"],
      minLength: [3, "Panjang kategori minimal 3 huruf"],
      maxLength: [50, "Panjang kategori maksimal 50 huruf"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
