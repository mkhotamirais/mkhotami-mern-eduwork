const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, minLength: [3, "panjang nama minimal 5 karakter"], required: [true, "cart harus diisi"] },
    qty: { type: Number, required: [true, "qty harus diisi"], min: [1, "minimal 1 qty"] },
    price: { type: Number, default: 0 },
    imageName: String,
    imageUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
