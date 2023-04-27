const mongodb = require("../databases/connect")
const ObjectId = require("mongodb").ObjectId
// const {validationResult} = require("express-validator")

const getAll = async (req, res) => {
	const result = await mongodb.getDb().db().collection("posts").find()
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
	})
}

const getMultiple = async (req, res) => {
    req.params.userName
	const result = await mongodb.getDb().db().collection("posts").find({user: req.params.userName})
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
	})
}

const getSingle = async (req, res) => {
	const userName = req.params.userName
	const result = await mongodb.getDb().db().collection("posts").find({user: "joe"})
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists[0])
	})
}

const addpost =async(req, res) =>{
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	//   }
    let currentDate = new Date()

	const post = {
		text: req.body.text,
        user: req.body.user,
        date: currentDate
	  };
	  const response = await mongodb.getDb().db().collection('posts').insertOne(post);
	  if (response.acknowledged) {
		res.status(201).json(response);
	  } else {
		res.status(500).json(response.error || 'Some error occurred while creating the contact.');
	  }
	};

const updatepost =async(req, res) =>{
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	  }
	const userId = new ObjectId(req.params.id);
	const post = {
		name: req.body.name,
		calories: req.body.calories,
		timeToMake: req.body.timeToMake,
		size: req.body.size,
	  };
	const response = await mongodb
	  .getDb()
	  .db()
	  .collection('posts')
	  .replaceOne({ _id: userId }, post);
	console.log(response);
	if (response.modifiedCount > 0) {
	  res.status(204).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while updating the workout.');
	}
  };

const deletepost =async(req, res) => {
	const userId = new ObjectId(req.params.id);
	const response = await mongodb.getDb().db().collection('posts').remove({ _id: userId }, true);
	console.log(response);
	if (response.deletedCount > 0) {
	  res.status(200).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while deleting the workout.');
	}
  };


module.exports = {getAll, getSingle, getMultiple, addpost, deletepost, updatepost}