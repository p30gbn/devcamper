const { Router } = require("express");
const {
  getBootcamps,
  createBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controller/bootcamps");
const router = Router();

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
