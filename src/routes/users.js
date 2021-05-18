const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    nickname: req.body.nickname,
    email: req.body.email,
    password: hash
  });
  const result = await user.save();
  res.status(201).json({
    message: "user created",
    result: result
  });
})

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email, nickname: req.body.nickname })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { nickname: fetchedUser.nickname, email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});
module.exports = router;

