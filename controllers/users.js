const mongodb = require("../databases/connect")
const ObjectId = require("mongodb").ObjectId
// const {validationResult} = require("express-validator")

const getAll = async (req, res) => {
	const result = await mongodb.getDb().db().collection("users").find()
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists)
	})
}

const getSingle = async (req, res) => {
	const userName = req.params.userName
	console.log(userName)
	const result = await mongodb.getDb().db().collection("users").find({userName: userName})
	result.toArray().then((lists) => {
		res.setHeader("Content-Type", "application/json")
		res.status(200).json(lists[0])
	})
}

const addUser = async(req, res) =>{
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	//   }

	const User = {
		userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate
	  };
	  const response = await mongodb.getDb().db().collection('users').insertOne(User);
	  if (response.acknowledged) {
		res.status(201).json(response);
	  } else {
		res.status(500).json(response.error || 'Some error occurred while creating the contact.');
	  }
	};

const updateUser =async(req, res) =>{
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	//   }
	const userId = req.body.username;
	const User = {
		userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate
	  };
	  console.log(userId)
	const response = await mongodb
	  .getDb()
	  .db()
	  .collection('users')
	  .replaceOne({ userName: userId }, User);
	console.log(response);
	if (response.modifiedCount > 0) {
	  res.status(204).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while updating the workout.');
	}
  };

const deleteUser =async(req, res) => {
	const userId = new ObjectId(req.params.id);
	const response = await mongodb.getDb().db().collection('users').remove({ _id: userId }, true);
	console.log(response);
	if (response.deletedCount > 0) {
	  res.status(200).send();
	} else {
	  res.status(500).json(response.error || 'Some error occurred while deleting the workout.');
	}
  };


module.exports = {getAll, getSingle, addUser, deleteUser, updateUser}