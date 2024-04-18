const { getTagById, updateTag, deleteTag, getTags, postTag } = require("../controllers/tagController");
const router = require("express").Router();

router.route("/").get(getTags).post(postTag);
router.route("/:id").get(getTagById).patch(updateTag).delete(deleteTag);

module.exports = router;
