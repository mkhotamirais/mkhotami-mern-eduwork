const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const { err, ok } = require("../helper/utils");

const updateCart = async (req, res) => {
  try {
    const productsIds = req.body.map((item) => item.id);
    const products = await Product.find({ _id: { $in: productsIds } });
    const cartItems = req.body.map((item) => {
      let relatedProduct = products.find((product) => product._id.toString() === item?.id);
      const { _id: productId, name, price, imageName, imageUrl } = relatedProduct;
      return { productId, name, price, qty: item.qty, imageUrl, imageName, user: req.userData.id, user: req.userData.id };
    });
    await Cart.deleteMany({ user: req.userData.id });
    await Cart.bulkWrite(
      cartItems.map((item) => {
        return {
          updateOne: {
            filter: { user: req.userData.id, productId: item.productId },
            update: item,
            upsert: true,
          },
        };
      })
    );
    ok(res, 200, `update cart`, cartItems);
  } catch (error) {
    err(res, 400, error);
  }
};

const getCarts = async (req, res) => {
  try {
    let data;
    if (req?.userData?.id) data = await Cart.find({ user: req?.userData?.id }).sort({ name: -1 });
    ok(res, 200, `getCarts`, data);
  } catch (error) {
    err(res, 400, error);
  }
};

module.exports = { getCarts, updateCart };
