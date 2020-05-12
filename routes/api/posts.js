const express = require("express");
const router = express.Router();

// @router GET api/posts
// @desc   Test route
// @access Public
router.get("/", (req, res) => {
  res.send({ msg: "hahah Post sample" });
});

module.exports = router;
