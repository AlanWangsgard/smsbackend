const routes = require("express").Router();
const fileUpload = require('express-fileupload');
const controller = require("../controllers/users")
const fs = require('fs');

routes.use(fileUpload());

routes.get('/', controller.getAll)

routes.get('/:userName', controller.getSingle)

routes.post('/', controller.addUser)

routes.put('/:userName', controller.updateUser)

routes.delete('/:userName', controller.deleteUser)

module.exports = routes;