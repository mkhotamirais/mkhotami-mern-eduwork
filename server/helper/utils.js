const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const multer = require("multer");
const { join } = require("path");
const { rootPath, ats, rts } = require("../config/constants");
const jwt = require("jsonwebtoken");

const ok = (res, status, message, data, fields = {}) => {
  res.status(status).json({ message, data, fields });
};

const err = (res, status, error) => {
  console.log(error);
  res.status(status).json({ message: error?.message || error, stack: error?.errors || error });
};

const hashPass = (pass) => {
  const salt = genSaltSync(10);
  const hash = hashSync(pass, salt);
  return hash;
};

const comparePass = (pass, hashPass) => {
  const result = compareSync(pass, hashPass);
  return result;
};

const upload = multer({ dest: join(rootPath, "public/images") }).single("image");

const jwtSign = (data, type) => {
  if (type == "access") return jwt.sign(data, ats, { expiresIn: "1d" });
  else if (type == "refresh") return jwt.sign(data, rts, { expiresIn: "7d" });
};

module.exports = { ok, err, hashPass, comparePass, upload, jwtSign };
