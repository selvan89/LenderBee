var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;

var controller = {};
controller.create = function(req, res, next){
	console.log(req.body);
	var newUser = {};
	newUser.fbid = req.body.id;
	newUser.username = req.body.name;
	newUser.firstname = req.body.first_name;
	newUser.lastname = req.body.last_name;
	newUser.fbprofile = req.body.link;
	//extract fb data to create users with
	//fb name (first, last)
	User.find({
		where: {
			fbid: newUser.fbid
		}
	}).then(function(user){
		console.log(user);
		if(!user){
			User.create(newUser).then(function(user){
			})
		}
		else{
			User.update(newUser).then(function(user){
			})
		}
	})
}

controller.getOne = function(req, res, next){
	var userId = req.params.user;
	User.find({
		where: {
			id: userId
		}
	}).then(function(user){
		res.json(user);
	}).catch(function(error){
	})
}


// controller.signin = function(req, res, next){
// 	//sign in with fb
// 	//check users table for match and do routing
// }

// controller.update = function(req, res, next){
// }

// controller.delete = function(req, res, next){
// }
module.exports = controller;