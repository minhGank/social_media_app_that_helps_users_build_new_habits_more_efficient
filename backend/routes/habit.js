const express = require("express");
const router = express.Router();

const {
  getAllHabits,
  addHabit,
  getUserHabit,
} = require("../controllers/habit");
const { authUser } = require("../middlewares/auth");

router.get("/getAllHabits", authUser, getAllHabits);
router.put("/addHabit", authUser, addHabit);
router.post("/getUserHabit", authUser, getUserHabit);
router.get("/getUserHabitForOverviewTab", authUser, getUserHabit);

module.exports = router;
