const Habit = require("../model/Habit");
const User = require("../model/User");
const UserHabit = require("../model/UserHabit");
exports.getAllHabits = async (req, res) => {
  try {
    const allHabits = await Habit.find();
    console.log(allHabits);
    res.json(allHabits);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addHabit = async (req, res) => {
  try {
    const { name, description, id } = req.body;
    const user = await User.findById(req.user.id);
    await Habit.findByIdAndUpdate(id, {
      $push: {
        do_er: user._id,
      },
    });
    const habit = await new UserHabit({
      name,
      description,
      user: req.user.id,
    }).save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { habit: habit._id },
    });
    res.status(200).json({ message: "Habit added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(req.body);
  }
};
