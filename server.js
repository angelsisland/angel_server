'use strict';

var vertx = require('vertx');
var console = require('vertx/console');
var api = require('api.js');

vertx.createHttpServer().requestHandler(function(request) {
	var path = request.path();
	var apiMatches = new RegExp('^/api/([a-z]+)$').exec(path);
	var apiMethod = (apiMatches) ? api[apiMatches[1]] : null;

	var timeString = new Date().toISOString().replace(/T/g, " ").replace(/....Z/g, "");
	console.log('[' + timeString + '] Request path : ' + request.path());
	if (apiMethod) {
		request.bodyHandler(function(body) {
			console.log('Request body :');
			console.log(body);

			var param = JSON.parse(body);
			var content = JSON.stringify(apiMethod(param));
			request.response.headers().set('Content-Length', content.length);
			request.response.write(content);
			request.response.end();

			console.log('Response body :');
			console.log(content);
		});

		return;
	}

	var testMatches = new RegExp('^/test/test\.(html|js)$').exec(request.path());

	if (testMatches) {
		request.response.sendFile('.' + testMatches[0]);
	} else {
		request.response.statusCode(404).statusMessage("Not Found").end();
	}
}).listen(8080);

