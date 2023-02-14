const express = require("express");

const {
  createUser,
  loginUser,
  authCheck,
  logoutUser,
} = require("../Controllers/userController");

const router = express.Router();

router.route("/auth").post(loginUser).get(authCheck).delete(logoutUser);
router.route("/register").post(createUser);

module.exports = router;