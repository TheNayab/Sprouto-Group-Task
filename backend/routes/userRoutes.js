const express = require("express");
const {
  registration,
  login,
  logout,
} = require("../Controllers/userController");
const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
