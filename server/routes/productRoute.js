const {
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts,
  postProduct,
} = require("../controllers/productController");
const { upload } = require("../helper/utils");

const router = require("express").Router();

router.route("/").get(getProducts).post(upload, postProduct);
router.route("/:id").get(getProductById).patch(upload, updateProduct).delete(deleteProduct);

module.exports = router;
