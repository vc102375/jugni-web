/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var config = require('./config');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/gallery', routes.views.gallery);
	app.get('/hs', routes.views.hs);
	
	app.post('/auth-sendOTP/', function (req, res) {
		//res.json();
		var path = '/api/auth/generate';
		console.log(" in auth send otp");
		
		var a = Math.floor(100000 + Math.random() * 900000)
		a = a.toString().substring(a.length-4,4);//, 4);

		code  =  parseInt(a);

		var data = {
			phone : parseInt(req.body.phone),
			code : code,
			active: true
		}

		config.postRequest(path, data, function(response){
				console.log(" i am back" );
				res.json(response);
		});
	});

	app.post('/auth-checkOTP/', function (req, res) {
		//res.json();
		var path = '/api/auth/';
		
		data = '{"where":{"phone":'+parseInt(req.body.phone)+',"code":'+parseInt(req.body.code)+',"active":true}}';
		
		path = '/api/auth?filter='+data;

		console.log(" in path send otp " +path);
		config.getRequest(path, function(response){
				res.json(response);
		});
	
	});

	app.post('/auth-check/OTP/', function (req, res) {
		//res.json();
		var path = '/api/auth/check';
		//data = '{"where":{"phone":'+parseInt(req.body.phone)+',"code":'+parseInt(req.body.code)+',"active":true}}';
		var data = {
			phone : parseInt(req.body.phone),
			code : parseInt(req.body.code),
		}

		console.log(" in path send otp " +path);
		config.postRequest(path, data, function(response){
				res.json(response);
		});
	
	});

	app.all('/contact', routes.views.contact);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
