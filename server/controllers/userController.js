const { err, ok, hashPass } = require("../helper/utils");
const User = require("../models/userModel");
const validator = require("validator");

const getUsers = async (req, res) => {
  try {
    const count = await User.find().countDocuments();
    const data = await User.find().sort({ createdAt: -1 }).select(["-__v", "-password"]);
    ok(res, 200, `getUsers`, data, { count });
  } catch (error) {
    err(res, 400, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    if (!data) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, `getUserById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postUser = async (req, res) => {
  try {
    const { username, email, password, confPassword } = req.body;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!email) return err(res, 400, `email harus diisi`);
    if (!password) return err(res, 400, `password harus diisi`);
    const dup = await User.findOne({ username });
    if (dup) return err(res, 409, `username sudah terdaftar`);
    const dup2 = await User.findOne({ email });
    if (dup2) return err(res, 409, `email sudah terdaftar`);
    if (!validator.isEmail(email)) return err(res, 400, `email tidak valid`);
    if (password.length < 5) return err(res, 400, `panjang password minimal 5 huruf`);
    if (password !== confPassword) return err(res, 400, `konfirmasi password salah`);
    req.body.password = hashPass(password);
    const data = await User.create(req.body);
    ok(res, 201, `post ${username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    if (!username) return err(res, 400, `username harus diisi`);
    if (!email) return err(res, 400, `email harus diisi`);
    const match = await User.findById(id);
    if (!match) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    if (req.body.password) {
      if (req.body.password !== req.body.confPassword) return err, `konfirmasi password salah`;
      req.body.password = hashPass(req.body.password);
    }
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    ok(res, 200, `update ${match?.username} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await User.findById(id);
    if (!match) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    await User.findByIdAndDelete(id);
    ok(res, 200, `delete ${match?.username} success`);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getUsers, getUserById, postUser, updateUser, deleteUser };
