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
    },
  ],

  status: {
    type: String,
    enum: ["Completed", "Paused", "Unstarted"],
    default: "Unstarted",
  },

  //   day1: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day2: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day3: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day4: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day5: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day6: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day7: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day8: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day9: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day10: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day11: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day12: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day13: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day14: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day15: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day16: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day17: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day18: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day19: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day20: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day21: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day22: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day23: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day24: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day25: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day26: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day27: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day28: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day29: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  //   day30: {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
});

module.exports = mongoose.model("Habit", habitSchema);
