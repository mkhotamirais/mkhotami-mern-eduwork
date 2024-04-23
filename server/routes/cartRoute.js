const { getCarts, updateCart } = require("../controllers/cartController");
const { verifyToken } = require("../helper/middleware");
const router = require("express").Router();

router.route("/").get(verifyToken, getCarts).patch(verifyToken, updateCart);

module.exports = router;
