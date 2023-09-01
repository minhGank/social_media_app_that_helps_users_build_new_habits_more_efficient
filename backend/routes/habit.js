const express = require("express");
const router = express.Router();

const { getAllHabits, addHabit } = require("../controllers/habit");
const { authUser } = require("../middlewares/auth");

router.get("/getAllHabits", authUser, getAllHabits);
router.put("/addHabit", authUser, addHabit);

module.exports = router;
