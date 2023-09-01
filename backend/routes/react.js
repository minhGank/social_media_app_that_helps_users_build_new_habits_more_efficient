const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth");
const { reactPost, getReacts } = require("../controllers/react");

router.put("/reactPost", authUser, reactPost);
router.get("/getReacts/:id", authUser, getReacts);

module.exports = router;
