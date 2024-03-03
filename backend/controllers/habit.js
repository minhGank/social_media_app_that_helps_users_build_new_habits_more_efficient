const Habit = require("../model/Habit");
const Post = require("../model/Post");
const User = require("../model/User");
const UserHabit = require("../model/UserHabit");
exports.getAllHabits = async (req, res) => {
  try {
    const allHabits = await Habit.find();
    res.json(allHabits);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addHabit = async (req, res) => {
  try {
    const { name, description, id } = req.body;
    const user = await User.findById(req.user.id);
    const checkIfUserAlreadyHaveTheSameHabit = await Habit.findOne({
      id: id,
      do_er: req.user.id,
    });
    if (checkIfUserAlreadyHaveTheSameHabit) {
      res.json("This habit is already in your habit list");
    } else {
      await Habit.findByIdAndUpdate(id, {
        $push: {
          do_er: user._id,
        },
      });
      const habit = await new UserHabit({
        name: name,
        description: description,
        user: req.user.id,
        status: "Unstarted",
        dayStart: "",
      }).save();

      await User.findByIdAndUpdate(req.user.id, {
        $push: { habit: habit._id },
      });
      res.status(200).json({ message: "Habit added successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserHabit = async (req, res) => {
  try {
    const userHabit = await User.findById(req.user.id).populate(
      "habit",
      "name description  status dayStart 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30"
    );

    const posts = await Post.find({ user: req.user.id });

    if (!userHabit.habit) {
      res.json("You're currently not building any habit");
    } else {
      res.json({ userHabit, posts });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
