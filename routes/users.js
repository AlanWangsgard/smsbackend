const routes = require("express").Router();
const fileUpload = require('express-fileupload');
const controller = require("../controllers/posts")
const fs = require('fs');

routes.use(fileUpload());

routes.get('/', controller.getAll)

routes.post('/', controller.addpost)

routes.put('/:userName', controller.updateUser)

routes.delete('/:userName', controller.deleteUser)

module.exports = routes;