const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "nama alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
    kelurahan: { type: String, required: [true, "kelurahan alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
    kecamatan: { type: String, required: [true, "kecamatan alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
    kabupaten: { type: String, required: [true, "kabupaten alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
    provinsi: { type: String, required: [true, "provinsi alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
    detail: { type: String, required: [true, "detail alamat harus diisi"], maxLength: [255, "maksimal 255 karakter"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("address", addressSchema);
