const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const { err, ok } = require("../helper/utils");

const updateCart = async (req, res) => {
  try {
    const { productId, cartId, qty, type } = req.body;
    const product = await Product.findById(productId);
    if (!cartId) {
      const cart = await Cart.findOne({ $and: [{ productId }, { user: req.userData.id }] });
      if (!cart) {
        const newCart = await Cart.create({ productId, qty, productPrice: product.price, user: req.userData.id });
        return ok(res, 200, `new cart`, newCart);
      } else {
        const addCartOne = await Cart.findByIdAndUpdate(
          cart._id,
          { qty: cart.qty + 1, productPrice: product.price * (cart.qty + 1) },
          { new: true }
        );
        return ok(res, 200, `add cart one`, addCartOne);
      }
    } else {
      const cart = await Cart.findById(cartId);
      let newQty, newProductPrice;
      if (type == "plus" || type == "minus") {
        newQty = cart.qty + qty;
        newProductPrice = product.price * (cart.qty + 1);
      } else {
        newQty = qty;
        newProductPrice = product.price * qty;
      }
      const resultCart = await Cart.findByIdAndUpdate(cartId, { qty: newQty, productPrice: newProductPrice }, { new: true });
      if (resultCart.qty > 0) {
        return ok(res, 200, `plus cart`, resultCart);
      } else {
        const deleteCart = await Cart.findByIdAndDelete(cartId);
        return ok(res, 200, `delete cart`, deleteCart);
      }
    }
  } catch (error) {
    err(res, 400, error);
  }
};

const getCarts = async (req, res) => {
  try {
    let data;
    if (req?.userData?.id)
      data = await Cart.find({ user: req?.userData?.id })
        .sort("-createdAt")
        .populate({ path: "productId", select: ["_id", "name", "price", "imageName", "imageUrl"] });
    res.status(200).json({ message: `getCarts`, data });
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getCarts, updateCart };
