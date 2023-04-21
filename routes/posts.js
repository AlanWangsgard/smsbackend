const routes = require("express").Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');

routes.use(fileUpload());

routes.post('/', (req, res) =>{
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

    // let exists = fs.existsSync(__dirname + "/images/"+ "yeet." + name.slice(-1))
    
  

    // image.mv(__dirname + '/images/' + "taco." + name.slice(-1));

    // Move the uploaded image to our upload folder
    image.mv(file);

    res.sendStatus(200);
})

module.exports = routes;