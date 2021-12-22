var express = require('express');
var router = express.Router();
const controller = require("../controllers/comment.js");

  // Create a new Tutorial
  router.post("/", controller.createComment);

  // Retrieve a single Tutorial with id
  router.get("/:id", controller.findCommentById);

  router.delete("/:id", controller.deleteComment);
  
  router.get("/",controller.deleteComment)

  module.exports = router;