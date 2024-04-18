const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const multer = require("multer");
const { join } = require("path");
const { rootPath } = require("../config/constants");

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

const comparePass = (pass, data) => {
  const result = compareSync(pass, data?.password);
  return result;
};

const upload = multer({ dest: join(rootPath, "public/images") }).single("image");

module.exports = { ok, err, hashPass, comparePass, upload };
