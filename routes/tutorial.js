var express = require('express');
var router = express.Router();
const controller = require("../controllers/tutorial.js");

  // Create a new Tutorial
  router.post("/", controller.createTutorial);

  // Retrieve all Tutorials
  router.get("/:id", controller.findTutorialById);

    // Retrieve a single Tutorial with id
  router.get("/", controller.findAllTutorials);

  router.delete("/:id", controller.deleteTutorial);

  module.exports = router;