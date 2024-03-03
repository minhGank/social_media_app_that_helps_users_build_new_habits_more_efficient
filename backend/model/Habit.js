const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
  },
  do_er: [
    {
      type: ObjectId,
      ref: "User",
      allowNull: true,
    },
  ],

  status: {
    type: String,
    enum: ["Completed", "Paused", "Unstarted"],
    default: "Unstarted",
  },
});

module.exports = mongoose.model("Habit", habitSchema);
