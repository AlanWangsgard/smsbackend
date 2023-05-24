const routes = require("express").Router();

routes.use("/posts", require("./posts"));
routes.use("/users", require('./users'));

module.exports = routes;