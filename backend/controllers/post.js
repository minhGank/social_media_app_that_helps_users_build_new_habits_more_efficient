const { default: mongoose } = require("mongoose");
const Post = require("../model/Post");
const User = require("../model/User");
const UserHabit = require("../model/UserHabit");
const { ObjectId } = require("mongodb");

exports.createPost = async (req, res) => {
  try {
    const { habit, day } = req.body;
    console.log(habit);
    const habitId = new ObjectId(habit);
    const dayInString = day.toString();
    const post = await new Post({
      ...req.body,
      habit: habitId,
      date: new Date(),
    }).save();
    const updateDay = {
      [dayInString]: post._id,
    };
    if (day == 1) {
      await UserHabit.findByIdAndUpdate(habit, {
        dayStart: new Date(),
        status: "Active",
      });
    }
    await UserHabit.findByIdAndUpdate(habit, {
      $set: updateDay,
    });
    const userHabit = await UserHabit.findById(habit);

    await post.populate(
      "user",
      "first_name last_name picture username habit day"
    );
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    //choose the following user field
    const followingTemp = await User.findById(req.user.id).select("following");
    //choose the following user
    const following = followingTemp.following;
    //find all the posts of the following users, and populate the user, comments,...
    const promises = following.map((follow) => {
      return Post.find({ user: follow })
        .populate("user", "first_name last_name picture username")
        .populate("habit", "name")
        .populate("comments.commentBy", "first_name last_name picture username")
        .sort({ createdAt: -1 })
        .limit(10);
    });
    //set the variables for that result, the follwoingPosts will be an array
    const followingPosts = (await Promise.all(promises)).flat();
    //find all the posts of the user and populate their information, comments
    const userPosts = await Post.find({ user: req.user.id })
      .populate("user", "first_name last_name picture username")
      .populate("comments.commentBy", "first_name last_name picture username")
      .populate("habit", "name")

      .sort({ createdAt: -1 })
      .limit(10);
    followingPosts.push(...[...userPosts]);
    followingPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    res.json(followingPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.comment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    ).populate("comments.commentBy", "picture first_name last_name username");
    res.json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
