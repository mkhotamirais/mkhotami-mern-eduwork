const { ok, err } = require("../helper/utils");
const userModel = require("../models/userModel");
const User = require("../models/userModel");
const Address = require("../models/addressModel");

const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id);
    let count, data;
    if (user.role === "admin") {
      count = await Address.find().countDocuments();
      data = await Address.find()
        .sort("-createdAt")
        .populate({ path: "user", select: ["username"] });
    } else {
      count = await Address.find({ user: user.id }).countDocuments();
      data = await Address.find({ user: user.id })
        .sort("-createdAt")
        .populate({ path: "user", select: ["username"] });
    }
    ok(res, 200, `getAddress`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const getAddressById = async (req, res) => {
  try {
    const data = "ahmad";
    ok(res, 200, `getAddressById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postAddress = async (req, res) => {
  try {
    req.body.user = req.userData.id;
    const data = await Address.create(req.body);
    ok(res, 200, `post ${data.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Address.findById(id);
    if (!match) err(res, 400, `address dengan id ${id} tidak ditemukan`);
    const addressUser = await Address.findOne({ $and: [{ _id: id }, { user: req.userData.id }] });
    if (!addressUser) err(res, 400, `akses tidak diizinkan`);
    const data = await Address.findByIdAndUpdate(addressUser._id, req.body, { new: true });
    ok(res, 200, `delete address ${data.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Address.findById(id);
    if (!match) return err(res, 400, `address dengan id ${id} tidak ditemukan`);
    if (req.userData.role === "admin") {
      const data = await Address.findByIdAndDelete(id);
      ok(res, 200, `delete ${data.name} success`, data);
    } else {
      const data = await Address.findOne({ $and: [{ _id: id }, { user: req.userData.id }] });
      if (!data) return err(res, 401, `akses tidak diizinkan`);
      const result = await Address.findByIdAndDelete(data._id);
      ok(res, 200, `delete ${result.name} success`, result);
    }
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getAddresses, getAddressById, postAddress, updateAddress, deleteAddress };
