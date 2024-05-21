const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    totalPrice: { type: Number, required: true },
    address: {
      name: { type: String, required: [true, "nama alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
      kelurahan: { type: String, required: true, maxLength: [255, "maksimal 255 karakter"] },
      kecamatan: { type: String, required: true, maxLength: [255, "maksimal 255 karakter"] },
      kabupaten: { type: String, required: true, maxLength: [255, "maksimal 255 karakter"] },
      provinsi: { type: String, required: [true, "provinsi alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
      detail: { type: String, required: [true, "detail alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
    },
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: { type: Number, required: true },
        productPrice: { type: Number, default: 0 },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
