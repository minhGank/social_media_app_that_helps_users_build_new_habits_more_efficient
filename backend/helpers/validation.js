const User = require("../model/User");

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//create validation for length of fname, lname, email,...
exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

//create validation for username
exports.validateUsername = async (username) => {
  let a = false;
  do {
    let check = await User.findOne({ username });
    if (check) {
      //change username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);
  return username;
};
