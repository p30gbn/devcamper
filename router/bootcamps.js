const { Router } = require("express");
const {
  getBootcamps,
  createBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
} = require("../controller/bootcamps");
const router = Router();

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampInRadius);

module.exports = router;
