const {
  getAddressById,
  getAddresses,
  postAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const router = require("express").Router();

router.route("/").get(getAddresses).post(postAddress);
router.route("/:id").get(getAddressById).patch(updateAddress).delete(deleteAddress);

module.exports = router;
