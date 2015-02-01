'use strict';

var vertx = require('vertx');
var console = require('vertx/console');
var api = require('api.js');

vertx.createHttpServer().requestHandler(function(request) {
	var path = request.path();
	var timeString = new Date().toISOString().replace(/T/g, " ").replace(/....Z/g, "");
	console.log('[' + timeString + '] Request path : ' + path);

	// --------------------------------
	// /api/*
	// --------------------------------
	var apiMatches = new RegExp('^/api/([a-z]+)$').exec(path);
	var apiMethod = (apiMatches) ? api[apiMatches[1]] : null;
	if (apiMethod) {
		request.bodyHandler(function(body) {
			console.log('Request body :\n' + body);

			var param = body.length() ? JSON.parse(body) : {};
			apiMethod(param, function(result) {
				var response = JSON.stringify(result);
				request.response.headers().set('Content-Length', response.length);
				request.response.write(response);
				request.response.end();

				console.log('Response :\n' + response);
			});
		});

		return;
	}

	// --------------------------------
	// /test/test.*
	// --------------------------------
	var testMatches = new RegExp('^/test/test\.(html|js)$').exec(request.path());
	if (testMatches) {
		request.response.sendFile('.' + testMatches[0]);

		return;
	}

	// --------------------------------
	// Other
	// --------------------------------
	request.response.statusCode(404).statusMessage("Not Found").end();
}).listen(8080);

