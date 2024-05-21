const { err, ok } = require("../helper/utils");
const Order = require("../models/orderModel");
const Address = require("../models/addressModel");
const Cart = require("../models/cartModel");

const postOrder = async (req, res) => {
  try {
    const { cart, address } = req.body;
    req.body.address = await Address.findById(address).select(["-_id", "-createdAt", "-updatedAt", "-__v", "-user"]);
    req.body.cart = await Cart.find({ _id: { $in: cart } }).select(["-_id", "-__v", "-user", "-createdAt", "-updatedAt"]);
    req.body.user = req.userData.id;
    const data = await Order.create(req.body);
    if (data) await Cart.deleteMany({ user: req.userData.id });
    ok(res, 201, `Order success`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const getOrder = async (req, res) => {
  try {
    const data = await Order.find({ user: req.userData.id })
      .populate({ path: "cart", populate: { path: "productId", select: ["name"] } })
      .populate("address");
    ok(res, 200, `getOrder`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Order.findById(id).populate("cart").populate("address");
    //   .populate({ path: "address", select: ["_id", "name"] });
    ok(res, 200, `getOrderById`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getOrder, getOrderById, postOrder };
