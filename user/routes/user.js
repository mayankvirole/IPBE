const auth = require('../../config/auth');
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth,userController.getUserDetails);

module.exports = router;