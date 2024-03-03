const express = require("express");
const {
  peopleYouMayKnow,
  yourFollower,
  yourFollowing,
} = require("../controllers/follow");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.get("/peopleYouMayKnow", authUser, peopleYouMayKnow);
router.get("/yourFollower", authUser, yourFollower);
router.get("/yourFollowing", authUser, yourFollowing);

module.exports = router;
