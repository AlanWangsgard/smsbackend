const routes = require("express").Router();
const fileUpload = require('express-fileupload');
const controller = require("../controllers/posts")
const fs = require('fs');

routes.use(fileUpload());

routes.get('/', controller.getAll)

routes.get('/fyp/:following', controller.getFyp)

routes.get('/:userName', controller.getUserPosts)

routes.get('/byId/:id', controller.getById)

routes.post('/', controller.addpost)

routes.post('/image', (req, res) =>{
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Check for duplicate files and add suffix if it is a duplicate
    let name = image.name.split('.')

    var exists = true

    i = 1

    let file = __dirname + "/../" + "/images/"+ name[0] + "." + name.slice(-1)

    exists = fs.existsSync(file)

    if (exists == true){

      while (exists){
        file = __dirname + "/../"+"/images/"+ name[0] + "-" + i + "." + name.slice(-1)
        exists = fs.existsSync(file)
        i++
      }
    }

    // Move the uploaded image to our upload folder
    image.mv(file);

    res.sendStatus(200);
})
routes.delete('/:id', controller.deletepost)
// routes.post('/image2' (req))
routes.put('/:id', controller.updatepost)

module.exports = routes;