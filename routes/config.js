/**
 * This file defines the email tests for your project.
 * 
 * Each email test should provide the locals used to render the
 * email template for preview.
 * 
 * Values can either be an object (for simple tests), or a
 * function that calls a callback(err, locals).
 * 
 * Sample generated emails, based on the keys and methods below,
 * can be previewed at /keystone/test-email/{key}
 */

var keystone = require('keystone');
var http = require('http');
var queryString = require('querystring');
CONFIG = {
	api: {
	//	host: 'neebaltech.neebal.com',
	//	port: 7028
		host: '127.0.0.1',
		port: 9000
	//	host: 'devapi.sassystudios.in',
	//	port: 80
	}
}


	
	/** New Enquiry Notifications */

	// function to make get request/call
exports.getRequest =  function(path, callback, headers){
//CONFIG.get_request = function(path, callback, headers){
	var options = {
	  host: CONFIG.api.host,
	  port: CONFIG.api.port,
	  path: path,
	  method: 'GET',
	  headers: {}
	};
	if (headers && headers.authorization)
		options.headers.Authorization = headers.authorization;
	var body = '';
	http.request(options, function(res) {
	  	console.log('STATUS: ' + res.statusCode);
	  	//console.log('HEADERS: ' + JSON.stringify(res.headers));
	  	res.setEncoding('utf8');
	  	res.on('data', function (chunk) {
	    	//console.log('BODY: ' + chunk);
	    	body += chunk; 
	  	});
	  	res.on('end', function() {
	  		// Data reception is done, do whatever with it!
	  		try{
	  			var parsed = JSON.parse(body);
	  			console.log(parsed);
	  			//response.send(parsed);	
	  			callback(parsed);
	  		}
			catch(e){
				console.log(e);
			}
		});
	}).end();

}; // end function

// function to make post request/call
exports.postRequest = function(path, data, callback, headers){

	var postData = JSON.stringify(data);

	console.log(postData);
	var options = {
	  host: CONFIG.api.host,
	  port: CONFIG.api.port,
	  path: path,
	  method: 'POST',
	  headers: {
      	"Content-Type": "application/json",
      	"Content-Length": Buffer.byteLength(postData)
	  }
	};
	console.log(options);

	if (headers && headers.authorization)
		options.headers.Authorization = headers.authorization;
	var body = '';
	var req = http.request(options, function(res) {
	  	console.log('STATUS: ' + res.statusCode);
	  	//console.log('HEADERS: ' + JSON.stringify(res.headers));
	  	res.setEncoding('utf8');
	  	res.on('data', function (chunk) {
	    	//console.log('BODY: ' + chunk);
	    	body += chunk; 
	  	});
	  	res.on('end', function() {
	  		// Data reception is done, do whatever with it!
	  		try{
	  			var parsed = JSON.parse(body);
	  			console.log(parsed);
	  			//response.send(parsed);	
	  			callback(parsed);
	  		}
			catch(e){
				console.log(e);
			}
		});

	

	});
// write data to request body
	req.write(postData);
	
	req.end();

};
