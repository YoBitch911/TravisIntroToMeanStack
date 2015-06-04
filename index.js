// Bootstraping the server

//for server module
var express = require('express');
//for mongo db interaction
var mongooose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

//creating the application
var app = express();

//Custom Express MiddleWares
//Add Middle ware necessary for REST API's
//The Middle wares intercept the request to the servers
//check whether each one of them would be a suitable or not

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS Support
//Beasically means that we have opened our APIs to all requests
//Http not HTTPs(i guess), anybody can acess it
app.use(function(req,res,next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

//use is a middle ware which acts sequentially
app.use('/hello', function(req,res,next){
	res.send('Hello World');
	next();
});
//Connect to MongoDB(will connect only if Running)
//The last name 'meanapp' is the database name
mongooose.connect('mongodb://localhost/meanapp');
//once - i guess make only connection to the db
mongooose.connection.once('open',function(){
	console.log('Listening on port 3000...');
	//Load the models
	//good way to load all the models instead of 
	//manually loading each model schema from models directory
	app.models = require('./models/index');

	//load the routes from routes.js which in turn 
	//have model based restful controllers assigned to routes
	var routes = require('./routes');
	//using lodash module now for iterating over the routes
	//it assigns the value as the 1st argument and key as the second
	_.each(route, function(controller,route) {
		//now passing in the arguments to the controller so that
		app.use(route,controller(app,route));
	});

	app.listen(3000);
});