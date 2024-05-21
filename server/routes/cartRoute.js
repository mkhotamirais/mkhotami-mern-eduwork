const { getCarts, updateCart } = require("../controllers/cartController");
const { verifyToken } = require("../helper/middleware");
const router = require("express").Router();

router.use(verifyToken);
router.route("/").get(getCarts).patch(updateCart);

module.exports = router;
