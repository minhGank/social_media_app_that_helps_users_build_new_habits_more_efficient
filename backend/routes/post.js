const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, comment } = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", authUser, getAllPosts);
router.put("/comment", authUser, comment);

module.exports = router;
