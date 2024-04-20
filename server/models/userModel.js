const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Nama harus diisi"],
      unique: true,
      minLength: [3, "Panjang nama minimal 3 huruf"],
      maxLength: [100, "Panjang nama maksimal 100 huruf"],
    },
    email: {
      type: String,
      required: [true, "email harus diisi"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password harus diisi"],
      minLength: [5, "Panjang password minimal 5 huruf"],
    },
    role: {
      type: String,
      enum: ["user", "guest", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    token: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
