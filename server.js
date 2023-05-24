const express = require('express')
const app = express()
const mongodb = require("./databases/connect")
const bodyparser = require("body-parser")
// const fileUpload = require('express-fileupload');
const cors = require('cors')
// const fs = require('fs');
const port = 3000

// app.use(fileUpload());
app.use(cors({
  origin: '*'
}))

// app.use(bodyparser.json())
app.use(bodyparser.json({ limit: '10mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '10mb' }));

app.use('/', require('./routes'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/upload', (req, res) =>{
//     // Get the file that was set to our field named "image"
//     const { image } = req.files;

//     // If no image submitted, exit
//     if (!image) return res.sendStatus(400);

//     // Move the uploaded image to our upload folder
//     let name = image.name.split('.')
//     var exists = true
//     i = 1
//     let file = __dirname + "/images/"+ name[0] + "." + name.slice(-1)
//     exists = fs.existsSync(file)
//     if (exists == true){
//       while (exists){
//         file = __dirname + "/images/"+ name[0] + "-" + i + "." + name.slice(-1)
//         exists = fs.existsSync(file)
//         i++
//       }
//     }

//     // let exists = fs.existsSync(__dirname + "/images/"+ "yeet." + name.slice(-1))
    
  

//     // image.mv(__dirname + '/images/' + "taco." + name.slice(-1));
//     image.mv(file);

//     res.sendStatus(200);
// })

mongodb.initDb((err, mongodb) => {
	if (err) {
		console.log(err)
	} else {
		app.listen(port)
		console.log(`Connected to DB and listening on ${port}`)
	}
})