'use strict';

var vertx = require('vertx');
var console = require('vertx/console');
var api = require('api.js');

// ----------------------------------------------------------------
// Run server
// ----------------------------------------------------------------
vertx.createHttpServer().requestHandler(function(request) {
	var path = request.path();
	var timeString = new Date().toISOString().replace(/T/g, " ").replace(/....Z/g, "");
	console.log('[' + timeString + '] Request path : ' + path);

	// --------------------------------
	// Session check
	// --------------------------------
	var cookie = request.headers().get('Cookie');
	var session = cookie ? cookie.replace(/session=/g, "") : null;
	console.log("HEADER(Session) " + session);

	// --------------------------------
	// /api/*
	// --------------------------------
	var apiMatches = new RegExp('^/api/([a-z]+)$').exec(path);
	var apiMethod = (apiMatches) ? api[apiMatches[1]] : null;
	if (apiMethod) {
		request.bodyHandler(function(body) {
			console.log('Request body :\n' + body);

			var param = body.length() ? JSON.parse(body) : {};
			param.user_id = session;
			apiMethod(param, function(result, session) {
				if (session) {
					request.response.headers().set('Set-Cookie', 'session=' + session);
				}
				var response = JSON.stringify(result);
				request.response.headers().set('Content-Length', new vertx.Buffer(response).length());
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

