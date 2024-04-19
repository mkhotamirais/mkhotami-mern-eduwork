const { getUsers, postUser, updateUser, deleteUser, getUserById } = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../helper/middleware");

const router = require("express").Router();

router.route("/").get(verifyToken, verifyAdmin, getUsers).post(verifyToken, verifyAdmin, postUser);
router
  .route("/:id")
  .get(verifyToken, verifyAdmin, getUserById)
  .patch(verifyToken, verifyAdmin, updateUser)
  .delete(verifyToken, verifyAdmin, deleteUser);

module.exports = router;
