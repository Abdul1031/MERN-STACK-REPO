const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/role");

const {
  signup,
  login,
  me,
  getallusers,
} = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", authenticate, me);

router.get("/allusers", authenticate, isAdmin, getallusers);

module.exports = router;
