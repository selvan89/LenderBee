var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var users = require('./users/controller.js');
var items = require('./items/controller.js');
var messages = require('./messages/controller.js');

module.exports = function(app, express){
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(logger('dev'));
	app.use(express.static(path.join(__dirname, '../client')));

	//route for the homepage
	app.get('/', function(req, res){
		res.render('../client/index.html')
	});

	//API routes for users (can amend as we decide what we need)
	app.post('/api/users/signup', users.create);
	app.post('/api/users/signin', users.signin);
	app.put('/api/users/:username', users.update);
	app.delete('/api/users/:username', users.delete);

	//API routes for items (can amend as we decide what we need)
	app.post('/api/items/:user', items.create);
	app.get('/api/items/:user', items.read);
	app.put('/api/items/:user/:item', items.update);
	app.delete('/api/items/:user/:item',items.delete);

	//API routes for messages (can amend as we decide what we need)
	app.post('/api/items/:user/:item', messages.create);
	app.get('/api/items/:user/:item', messages.read);

};