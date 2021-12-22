const db = require("../models");
const Comment = db.comments;

  exports.createComment = (req, res) => {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const comment = {
      name: req.body.name,
      text: req.body.text,
    };
    return Comment.create(comment)
      .then((data) => {
        console.log(">> Created comment: " + JSON.stringify(data, null, 4));
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment."
      });
    })
  };

  exports.findCommentById = (req, res) => {
    const id = req.params.id;

    return Comment.findByPk(id, { include: ["tutorial"] })
      .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id
      });
    });
  };


  exports.findAllComments = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;   
    Comment.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    });
  };

  exports.deleteComment = (req, res) => {
    const id = req.params.id;
    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        console.log(num)
        if (num) {
          res.send({
            message: "Comment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Comment with id=" + id
        });
      });
  };
