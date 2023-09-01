const express = require("express");
const router = express.Router();
const { uploadImages, listImages } = require("../controllers/upload");
const { authUser } = require("../middlewares/auth");
const imageUpload = require("../middlewares/imageUpload");

router.post("/uploadImages", authUser, imageUpload, uploadImages);
router.post("/listImages", authUser, listImages);
module.exports = router;
