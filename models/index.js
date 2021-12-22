const Sequelize = require("sequelize");
const sequelize = new Sequelize('node_project', 'nicolas', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

module.exports = db