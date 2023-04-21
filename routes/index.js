const routes = require("express").Router();

routes.use("/posts", require("./posts"));

module.exports = routes;