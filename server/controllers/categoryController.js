const { err, ok } = require("../helper/utils");
const Category = require("../models/categoryModel");

const getCategories = async (req, res, next) => {
  try {
    const count = await Category.find().countDocuments();
    const data = await Category.find().sort({ createdAt: -1 }).select("-__v");
    ok(res, 200, `getCategories`, data, { count });
  } catch (error) {
    err(res, 400, error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Category.findById(id);
    if (!data) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    ok(res, 200, `getCategoryById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const postCategory = async (req, res, next) => {
  try {
    const data = await Category.create(req.body);
    ok(res, 201, `post ${req.body?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const match = await Category.findById(id);
    if (!match) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    const data = await Category.findByIdAndUpdate(id, req.body, { new: true });
    ok(res, 200, `update ${match?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const match = await Category.findById(id);
    if (!match) return err(res, 404, `data dengan id ${id} tidak ditemukan`);
    const data = await Category.findByIdAndDelete(id);
    ok(res, 200, `delete ${match?.name} success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getCategories, getCategoryById, postCategory, updateCategory, deleteCategory };
