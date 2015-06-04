//takes a mongo db model (schema) and converts it into
// REST APIs , like GET,POST,DELETE for them
var restful = require('node-restful');

module.exports = function(app,route) {

	// Setup the controller for REST
	var rest = restful.model(
		'movie',
		app.models.movie
		).methods(['get', 'put', 'post', 'delete']);

	//Register this endpoint with the application
	rest.register(app,route);

	//Return middleware
	return function(req,rest,next) {
		next();
	};
};