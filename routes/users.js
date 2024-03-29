const routes = require("express").Router();
const fileUpload = require('express-fileupload');
const controller = require("../controllers/users")
const {userValidation} = require('../validation')

const fs = require('fs');

routes.use(fileUpload());

routes.get('/', controller.getAll)

routes.get('/:userName', controller.getSingle)

routes.get('/search/:pattern', controller.getPattern)

routes.post('/',userValidation, controller.addUser)

routes.put('/:userName',userValidation, controller.updateUser)

routes.put('/follow/:userName', controller.updateFollow)

routes.delete('/:userName', controller.deleteUser)

module.exports = routes;