const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

router.post("/add-comment", commentsController.addNewComment);


module.exports  = router;