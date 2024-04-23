const { ok, err } = require("../helper/utils");
const userModel = require("../models/userModel");
const User = require("../models/userModel");
const Address = require("../models/addressModel");

const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id);
    let { skip = 0, limit = 5 } = req.query;
    if (userModel.ro) ok(res, 200, `getAddresses`);
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
    let nama = "ahmad";
  } catch (error) {
    err(res, 400, error);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Address.findById(id);
    if (!match) ok(res, 200, `delete`);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getAddresses, getAddressById, postAddress, updateAddress, deleteAddress };
