const mongoose = require("mongoose");
const UserHabit = require("./UserHabit");
const { ObjectId } = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      text: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    picture: {
      type: String,
      default:
        "https://scontent-ams2-1.xx.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=lxVi5aNcgXgAX86JCBZ&_nc_oc=AQmv0-s6lx39qPSLsngP3rkVIvpWTG4vpyQgXtaKFVaAhOWl68r-higwHxRXzY3P0Dg&_nc_ht=scontent-ams2-1.xx&oh=00_AfCE21hOsnWMpY7mR1XOfPow09jOn9jR-Rm-DtiDMCdt0A&oe=64CB87B8",
    },
    cover: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
    },

    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    habit: [{ type: ObjectId, ref: "UserHabit" }],
    //   in the future, we will remove friends, just keep followers and following
    friends: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
    habitCompleted: {
      type: ObjectId,
      ref: UserHabit,
      default: null,
    },
    privacy: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    //   less details in the future
    details: {
      bio: {
        type: String,
        default:
          "Tell something about yourself, your goals, your challenges,...",
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        SavedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
