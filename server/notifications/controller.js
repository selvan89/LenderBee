var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var Notification = global.db.Notification;
var controller = {};

controller.create = function(req, res, next){
	//get the item title out and the borrower name
	var item = req.params.item; //should be item id
	var borrower = req.params.borrower;
	User.find({
		where: {
			username: borrower
		}
	}).then(function(user){
			req.body.itemreq_id = item;
			req.body.userreq_id = user.id;
			Notification.create(req.body)
				.then(function(notification){
					res.send(notification);
				}).catch(function(error){
					console.log('error inside of notifications create ', error);
			})
		})
	}


// controller.getByUser = function(req, res, next){
// 	var user = req.params.user;
// 	User.find({
// 		where: {
// 			username: user
// 		}
// 	}).then(function(user){
// 		var userId = user.id;
// 		Item.findAll({
// 			where: {
// 				lender_id: user.id
// 			}
// 		}).then(function(items){
// 			var itemsList = [];
// 			for(var i = 0; i < items.length; i++){
// 				itemsList.push(items[i].id);
// 			}
// 			Notification.findAll({
// 				where: {
// 					itemreq_id: itemsList
// 				}
// 			}).then(function(notifications){
// 				res.json(notifications);
// 			})
// 		})
// 	})
// }

controller.acceptRequest = function(req, res, next){//This should delete all notifications related to the item
	//Would this have the id of the item? I think so.
	var borrowerId = req.params.borrower;
	Notification.destroy({
			where: {
				itemreq_id: req.params.item
			}
		}).then(function(){
			Item.update(
				{borrowed: true, borrower_id: req.params.borrower},
				{where: {id: req.params.item}}
			)
		}).then(function(){
				res.send('item updated and is now borrowed         *********');
		})
}

controller.rejectRequest = function(req, res, next){
	//reject the request from a single user
	Notification.destroy({
		where: {
			itemreq_id: req.params.item,
			userreq_id: req.params.borrower
		}
	}).then(function(){
		res.send('a particular users request for an item has been removed from the notificiations')
	})
}


module.exports = controller;
