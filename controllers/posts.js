const mongodb = require("../databases/connect")
const ObjectId = require("mongodb").ObjectId
// const {validationResult} = require("express-validator")

const getAll = async (req, res) => {
	const result = await mongodb.getDb().db().collection("posts").find().sort({"date": -1})
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
	})
}

const getFyp = async (req, res) => {
	console.log(req.params.following.split(','))
	const result = await mongodb.getDb().db().collection("posts").find({user: {$in: req.params.following.split(',')}}).sort({"date": -1})
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
	})
}

const getById = async (req, res) => {
	const id = new ObjectId(req.params.id)
	console.log('id', id)
	const result = await mongodb.getDb().db().collection("posts").find({_id: id})
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

const getUserPosts = async (req, res) => {
	const userName = req.params.userName
	console.log('username', userName)
	const result = await mongodb.getDb().db().collection("posts").find({user: userName}).sort({"date": -1})
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
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
        date: `${currentDate.getMonth()}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
		image: req.body.image
	  };
	  const response = await mongodb.getDb().db().collection('posts').insertOne(post);
	  if (response.acknowledged) {
		res.status(201).json(response);
	  } else {
		res.status(500).json(response.error || 'Some error occurred while creating the contact.');
	  }
	};

const updatepost =async(req, res) =>{
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	//   }
	const id = new ObjectId(req.params.id);
	const response = await mongodb
	  .getDb()
	  .db()
	  .collection('posts')
	  .updateOne({_id: id}, {$set:{text: req.body.text}})
	// console.log(response);
	if (response.modifiedCount > 0) {
	  res.status(204).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while updating the workout.');
	}
  };

const deletepost =async(req, res) => {
	const id = new ObjectId(req.params.id);
	console.log(id)
	const response = await mongodb.getDb().db().collection('posts').deleteOne({ _id: id }, true);
	console.log(response);
	if (response.deletedCount > 0) {
	  res.status(200).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while deleting the workout.');
	}
  };


module.exports = {getAll, getById, getUserPosts, getMultiple, addpost, deletepost, updatepost, getFyp}