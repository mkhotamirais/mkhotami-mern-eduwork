const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, minLength: [3, "Panjang minimal 3 huruf"], required: [true, "Harus diisi"], unique: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String },
    imageName: String,
    imageUrl: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    tags: { type: Array, ref: "Tag", default: [] },
    // tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
