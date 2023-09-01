const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userHabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Completed", "Paused", "Unstarted"],
    default: "Unstarted",
  },

  1: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  2: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  3: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  4: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  5: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  6: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  7: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  8: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  9: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  10: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  11: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  12: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  13: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  14: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  15: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  16: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  17: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  18: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  19: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  20: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  21: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  22: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  23: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  24: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  25: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  26: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  27: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  28: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  29: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
  30: {
    type: ObjectId,
    ref: "Post",
    default: null,
  },
});

module.exports = mongoose.model("UserHabit", userHabitSchema);
