// var Item = require('./models.js');
var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var controller = {};

controller.create = function(req, res, next){
	//extract the user name
	//query the user database to get id
	//set the lender_id of the item to the user id
	// console.log(req.params); //extract the username from the url
	console.log('username-------', req.params.user);

	User.find({ //find the user id of the currently logged in user
		where: {
			username: req.params.user
		}
	}).then(function(user){
		//extract user_id, city_id, state_id, and country_id from user
		console.log('USER ID ', user.id);
		req.body.lender_id = user.id
		Item.create(req.body)
			.then(function(item){
				res.json(item);
			})
			.error(function(error){
				('inside error of items create controller ', error);
			})
	}).error(function(error){
		('inside error of items create controller ', error);
	})
}

controller.getAll = function(req, res, next){
	Item.findAll()
		.then(function(items){
			res.json(items);
		})
		.error(function(error){
			console.log(error);
		})
}

controller.getOneUser = function(req, res, next){
	//extract the user name
	User.find({ //find the user id of the currently logged in user
		where: {
			user: req.params.user //extract the username from the url
		}
	})
		.then(function(user){ //use the user's id to find associated items in the items table
			console.log('------this is the returned user object from a User find ', user);
			Item.findAll({
				where: { //where the user id is associated with an items lender or borrower id
						lender_id: user.id, //this id call may not be allowed, will have to test
						// borrower_id: user.id
					}
				})
				.then(function(items){
					console.log('these are the items returned from a search by user--------', items);
					res.json(items); //after we find the items, return them back to the client
				})//the client can sort out based on lent or borrowed
		})
		.catch(function(error){
			console.log('items read error ', error);
		})
};

// controller.update = function(req, res, next){
// 	//Where we update the item to borrowed and assign it a borrower_id
// 	//the request params have a lender username
// 	//the request body would have the borrower username
// 	var item = req.params['item'];
// 	//Search for the item with a title set to the url
// 	var lender = req.params['user'];
// 	var borrower = req.body.borrower_id;
// 	User.find({
// 		where: {
// 			id: lender
// 		}
// 	})
// 		.then(function(user){
// 			Item.find({ //find the item with the title and lender_id equal to the request.body.user
// 				where: {
// 					$or: [ //search where the lender_id is equal to the lender and the title is at the
// 									//current item page
// 						{lender_id:user.id},
// 						{title:item}
// 					]
// 				}
// 			})
// 			.then(function(item){//with the returned item, update its borrower_id and borrowed_status
// 				//check to see if the item is currently borrowed
// 				if(item.borrowed === true){
// 					Item.update({
// 						borrowed: false,
// 						borrower_id: null
// 					},
// 					{
// 						where: {
// 							lender_id: lender,
// 							title: item
// 						}
// 					})
// 						.then(function(item){//return the items back to the client
// 							console.log('the correct item has been succesfully updated (returned)', item);
// 							res.json(item);
// 						})
// 				}
// 				else{
// 					Item.update({
// 						borrowed: true,
// 						borrower_id: borrower
// 					},
// 					{
// 						where: {
// 							lender_id: lender,
// 							title: title
// 						}
// 					})
// 						.then(function(item){//return the items back to the client
// 							console.log('the correct item has been succesfully updated (borrowed)', item);
// 							res.json(item);
// 						})
// 				}
// 			})
// 		})

// };

// controller.delete = function(req, res, next){
// 	//parse out of request
// 	//deletes the item from the for lend items list - ONLY
// 	//check to see if item is borrowed, if yes, can't delete
// 	//otherwise Item.destroy
// 	Item.find({
// 		where: {
// 			title: "Stinger"
// 		}
// 	})
// 	.then(function(item){
// 		console.log('item after finding it to delete', item)
// 		Item.destroy({
// 			where: {
// 				title: "Stinger"
// 			}
// 		})
// 			.then(function(item){
// 				console.log('item destroyed!!!!!');
// 			})
// 	})
// };

module.exports = controller;
