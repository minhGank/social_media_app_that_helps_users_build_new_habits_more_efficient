const express = require("express");
const router = express.Router();
const {
  register,
  activateAccount,
  login,
  auth,
  getProfile,
  updateProfilePicture,
  updateDetails,
  follow,
  unfollow,
  acceptRequest,
  sendRequest,
  deleteRequest,
  cancelRequest,
  searchResult,
  addToSearchHistory,
  getSearchHistory,
  removeSearchHistory,
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.get("/getProfile/:username", authUser, getProfile);
router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/updateDetails", authUser, updateDetails);
router.put("/follow/:id", authUser, follow);
router.put("/unfollow/:id", authUser, unfollow);
router.put("/sendRequest/:id", authUser, sendRequest);
router.put("/acceptRequest/:id", authUser, acceptRequest);
router.put("/deleteRequest/:id", authUser, deleteRequest);
router.put("/cancelRequest/:id", authUser, cancelRequest);
router.post("/searchResult/:searchTerm", authUser, searchResult);
router.put("/addToSearchHistory", authUser, addToSearchHistory);
router.get("/getSearchHistory", authUser, getSearchHistory);
router.put("/removeSearchHistory", authUser, removeSearchHistory);

module.exports = router;
