const React = require("../model/React");
const mongoose = require("mongoose");

exports.reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    console.log(react);
    // check if the react from this user is exist (or did the user is already react )
    const check = await React.findOne({
      postRef: postId,
      reactBy: req.user.id,
    });
    // if there's no react from this user before, then do this
    if (check == null) {
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      await newReact.save();
    } else {
      if (check.react == react) {
        await React.findByIdAndRemove(check._id);
      } else {
        await React.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getReacts = async (req, res) => {
  try {
    const reacts = await React.find({ postRef: req.params.id });
    const check = await React.findOne({
      reactBy: req.user.id,
      postRef: req.params.id,
    });
    res.json({
      reacts,
      check: check?.react,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
