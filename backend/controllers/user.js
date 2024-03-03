//import sending mail function
const { sendVertificationEmail } = require("../helpers/mailer");

//import generate token function
const { generateToken } = require("../helpers/tokens");

//import jwt
const jwt = require("jsonwebtoken");

//import validation of email, length , username
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");

//import USER SCHEMA
const User = require("../model/User");
const Post = require("../model/Post");

//Import bcrypt program to hash password
const bcrypt = require("bcrypt");

//------export the controller register function----------------//
exports.register = async (req, res) => {
  try {
    //--------------START CHECKING IF THE NEW USER INFO IS VALIDATE------------------

    //receive the data from req.body
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    // validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    //check if the email, fname, lname, password is unique and has good length
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "This email is already registered",
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "First name must has between 3-30 letters",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "Last name must has between 3-30 letters",
      });
    }
    if (!validateLength(password, 6, 30)) {
      return res.status(400).json({
        message: "Password must has between 6-30 letters",
      });
    }
    //end of checking the email, fname, lname, password is unique and has good length

    //--------------END OF CHECKING IF THE USER INFO IS VALIDATE------------------

    //-----------START SAVING THE NEW USER INTO THE DATA BASE--------------------

    //encrypt the password so it improves the security
    const cryptedPassword = await bcrypt.hash(password, 12);

    //create a random username+ validate it
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    //save that data to database/create new user
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
      habitCompleted: 0,
    }).save();

    //-----------END OF SAVING THE NEW USER INTO THE DATA BASE--------------------

    //create a JWT
    const emailVertificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    //setting the activate url for new user verrification
    const url = `${process.env.BASE_URL}/activate/${emailVertificationToken}`;

    //sending vertification mail to new user
    sendVertificationEmail(user.email, user.first_name, url);

    //generate jwt token for id user to send back to the cookie in the front end
    const token = generateToken({ id: user._id.toString() }, "7d");

    //----send back data for user, confirmation email announcement-------
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message:
        "A confirmation email was sent to you to completely activate your account",
    });
    //catch error
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//activate Account function
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;

    const { token } = req.body;

    //decode the token
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    //after decode and get the id, we can find that user
    const check = await User.findById(user.id);

    // check if the user who are trying to activate the account has the same login info
    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation.",
      });
    }

    //check if the user is verify
    if (check.verified == true) {
      return res.status(400).json({
        message: "This  email is already activated",
      });
    } else {
      //if the user haven't verify, now we update the verified field to true by using user.id
      await User.findByIdAndUpdate(user.id, { verified: true });

      //send the announcement
      return res
        .status(200)
        .json({ message: "Account has been activated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//login function
exports.login = async (req, res) => {
  try {
    //save data input from user in req.body
    const { email, password } = req.body;

    //find a email in the user database to see it valid with the input email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "The email address you entered is not correct" });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: "The password you entered is not correct" });
    }

    //generate jwt token for id user
    const token = generateToken({ id: user._id.toString() }, "7d");

    //send back data to user browser to save in the cookie and redux state
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.auth = (req, res) => {
  res.json("welcome from auth");
};

exports.getProfile = async (req, res) => {
  try {
    //add the params in the req to the username
    const { username } = req.params;
    const user = await User.findById(req.user.id);
    //use that username to find the information of that user in the backend (except password)
    const profile = await User.findOne({ username })
      .select("-password")
      .populate("followers", "first_name last_name username picture")
      .populate("following", "first_name last_name username picture")
      .populate(
        "habit",
        "name description postTheLastTime dayStart status 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30"
      );

    const friendship = {
      following: false,
      requestSent: false,
      requestReceived: false,
    };

    if (!profile) {
      return res.json({ ok: false });
    }

    if (user.following.includes(profile._id)) {
      friendship.following = true;
    }

    if (user.requests.includes(profile._id)) {
      friendship.requestReceived = true;
    }

    if (profile.requests.includes(user._id)) {
      friendship.requestSent = true;
    }

    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .populate("habit")
      .populate("comments.commentBy", "first_name last_name username picture")
      .sort({ createdAt: "desc" });

    //send all the data back to the front end
    res.json({ ...profile.toObject(), posts, friendship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;
    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });

    res.send(url);
  } catch (error) {}
};

exports.updateDetails = async (req, res) => {
  try {
    const { infos } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      {
        details: infos,
      },
      { new: true }
    );

    res.json(updated.details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        !receiver.requests.includes(sender._id) &&
        !receiver.following.includes(sender._id)
      ) {
        await receiver.updateOne({
          $push: { requests: sender._id },
        });

        res.json({ message: "Request sent" });
      } else {
        return res
          .status(500)
          .json({ message: "You're already sent the request" });
      }
    } else {
      return res.status(500).json({ message: "You can't follow yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await receiver.updateOne({
          $pull: { requests: sender._id },
        });
        await sender.updateOne({
          $push: { following: sender._id },
        });
        res.json({ message: "Request accepted" });
      } else {
        return res
          .status(500)
          .json({ message: "There's no request from this user" });
      }
    } else {
      return res
        .status(500)
        .json({ message: "You can't accept request from yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.follow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        !sender.following.includes(sender._id) &&
        !receiver.followers.includes(sender._id)
      ) {
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await sender.updateOne({
          $push: { following: receiver._id },
        });
        res.json({ message: "Follow successfully" });
      } else {
        return res.status(500).json({ message: "You're already following" });
      }
    } else {
      return res.status(500).json({ message: "You can't follow yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

exports.unfollow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (sender.following.includes(receiver._id)) {
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });
        await sender.updateOne({
          $pull: { following: receiver._id },
        });
        res.json({ message: "Unfollow successfully" });
      } else {
        return res.status(500).json({ message: "You're not following" });
      }
    } else {
      return res.status(500).json({ message: "You can't unfollow yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await receiver.updateOne({
          $pull: { requests: sender._id },
        });

        res.json({ message: "Request deleted" });
      } else {
        return res
          .status(500)
          .json({ message: "There's no request from this user" });
      }
    } else {
      return res.status(500).json({ message: "There is no request from you" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        receiver.requests.includes(sender._id) &&
        !receiver.following.includes(sender._id)
      ) {
        await receiver.updateOne({
          $pull: { requests: sender._id },
        });

        res.json({ message: "Request canceled" });
      } else {
        return res
          .status(500)
          .json({ message: "You haven't send request to this user" });
      }
    } else {
      return res.status(500).json({ message: "There is no request from you" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchResult = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const result = await User.find({ $text: { $search: searchTerm } }).select(
      "first_name last_name username picture"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { searchUser } = req.body;
    const search = {
      user: searchUser,
      createdAt: new Date(),
    };
    const check = user.search.find((x) => {
      if (x.user) {
        return x.user.toString() === searchUser;
      }
      return false; // If x.user is undefined, return false to indicate no match
    });

    if (check) {
      await User.updateOne(
        {
          _id: req.user.id,
          "search._id": check._id,
        },
        {
          $set: { "search.$.createdAt": new Date() },
        }
      );
    } else {
      await User.findByIdAndUpdate(req.user.id, { $push: { search } });
    }
  } catch (error) {
    console.error("Error in addToSearchHistory:", error);

    res.status(500).json({ message: error.message });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const searchHistory = await User.findById(req.user.id)
      .select("search")
      .populate("search.user", "first_name last_name picture username");
    res.json(searchHistory.search);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeSearchHistory = async (req, res) => {
  try {
    const { deletedUser } = req.body;
    await User.updateOne(
      { _id: req.user.id },
      {
        $pull: {
          search: { user: deletedUser },
        },
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
