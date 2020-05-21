const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userModel = require("../../Models/users");
const gavatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const config = require("config");

// @router GET api/usersA
// @desc   Test route
// @access Public
router.get("/", (req, res) => {
  res.send({ msg: "User Route" });
});

// @router GET api/users/signup
// @desc   Reg User
// @access Public
router.post(
  "/signup",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "include a email").isEmail(),
    check("password", "invalid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { name, password, email } = req.body;
    try {
      let user = await userModel.findOne({ email }); // check user exists
      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] });

      const avatar = gavatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new userModel({
        name,
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);

      bcrypt.hash(password, salt).then((res) => {
        user.password = res;
      });

      await user.save(); // save user - reg module

      // JWT generation
      const payload = {
        user: {
          id: user.id,
        },
      };

      jsonWebToken.sign(
        payload,
        config.get("secret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err){return res.send(err);} 
          // var Ouser=user._doc;
          // delete Ouser.password;
          // Ouser.token=token;
          res.status(200).send({ token });
        }
      );

      //res.send({ result: user.toJSON() });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
