const { postOrder, getOrder, getOrderById } = require("../controllers/orderController");
const { verifyToken } = require("../helper/middleware");
const router = require("express").Router();

router.use(verifyToken);
router.route("/").post(postOrder).get(getOrder);
router.route("/:id").get(getOrderById);

module.exports = router;
