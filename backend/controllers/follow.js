const User = require("../model/User");

exports.peopleYouMayKnow = async (req, res) => {
  try {
    const userFollowing = await User.findById(req.user.id).select("following");
    const people = await User.find({
      _id: { $nin: [...userFollowing.following, req.user.id] },
    }).select("first_name last_name username picture");
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.yourFollower = async (req, res) => {
  try {
    const follower = await User.findById(req.user.id)
      .select("followers")
      .populate("followers", "first_name last_name username picture");
    console.log(follower.followers);
    res.json(follower.followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.yourFollowing = async (req, res) => {
  try {
    const following = await User.findById(req.user.id)
      .select("following")
      .populate("following", "first_name last_name username picture");
    console.log("this", following.following);
    res.json(following.following);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
