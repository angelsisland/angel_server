'use strict';

var vertx = require('vertx');
var container = require('vertx/container');
var console = require('vertx/console');

// ----------------------------------------------------------------
// Database module setup
// ----------------------------------------------------------------
var mysql_config = {
	connection : 'MySQL',
	username : 'angel',
	password : 'next1234',
	database : 'angel'
};
container.deployModule('io.vertx~mod-mysql-postgresql_2.11~0.3.1', mysql_config, 1);

// ----------------------------------------------------------------
// Api functions
// ----------------------------------------------------------------
module.exports = (function() {
	var dummy = {
		post : [
			{ id : 12, title : "title sample", contents : "content sample ...", photo : null },
			{ id : 15, title : "title sample", contents : "multiline test \n line 2 \n line 3", photo : "/photo/sample.png" }
		],
		comment : [
			{ writer : "nickname sample", comment : "comment sample ..." },
			{ writer : "nickname sample", comment : "comment sample ..." },
			{ writer : "nickname sample", comment : "comment sample ..." }
		],
		result_succeed : { result : "succeed", error : null },
		result_failed : { result : "failed", error : "Unknown error" },
		userinfo : { nickname : "라파엘", level : 3, point : 100, need : 200 }
	};

	var dao = {
		need : {
			query : function(param) {
				var category = param.category ? param.category : 'solace';	// for test
				return {
					action : 'prepared',
					statement : 'SELECT post.id, title, post.contents, photo FROM post LEFT JOIN reply ON post.id = reply.post_id WHERE category=? GROUP BY post.id ORDER BY COUNT(reply.id) LIMIT 4',
					values : [category]
				};
			},
			arr2obj : function(arr) {
				return { id : arr[0], title : arr[1], contents : arr[2], photo : arr[3] };
			}
		},
		mypost : {
			query : function(param) {
				var writer = param.writer ? param.writer : 'TestAngel1';	// for test
				var category = param.category ? param.category : 'solace';	// for test
				return {
					action : 'prepared',
					statement : 'SELECT id, title, contents, photo FROM post WHERE writer=? AND category=? LIMIT 5',
					values : [writer, category]
				};
			},
			arr2obj : function(arr) {
				return { id : arr[0], title : arr[1], contents : arr[2], photo : arr[3] };
			}
		},
		letter : {
			query : function(param) {
				return {
					action : 'prepared',
					statement : 'SELECT id, title, contents, photo FROM post WHERE category=? LIMIT 8',
					values : ['letter']
				};
			},
			arr2obj : function(arr) {
				return { id : arr[0], title : arr[1], contents : arr[2], photo : arr[3] };
			}
		},
		view : {
			query : function(param) {
				var id = param.id ? param.id : 1;		// for test
				return {
					action : 'prepared',
					statement : 'SELECT id, writer, contents FROM reply WHERE post_id=?',
					values : [id]
				};
			},
			arr2obj : function(arr) {
				return { id : arr[0], writer : arr[1], comment : arr[2] };
			}
		}
	};

	function sendQuery(dao, param, handler) {
		console.log('Query : ' + JSON.stringify(dao.query(param)));
		vertx.eventBus.send('campudus.asyncdb', dao.query(param), function(reply) {
			var result = [];
			if (reply.status === 'ok') {
				reply.results.forEach(function(element) {
					result.push(dao.arr2obj(element));
				});
			} else {
				console.log('DB Error : ' + JSON.stringify(reply).replace(/\\n/g, "\n"));
			}
			handler(result);
		});
	}

	return {
		newuser : function(param, handler) {
			handler(dummy.result_succeed);
		},
		login : function(param, handler) {
			handler(dummy.result_succeed);
		},
		need : function(param, handler) {
			sendQuery(dao.need, param, handler);
		},
		mypost : function(param, handler) {
			sendQuery(dao.mypost, param, handler);
		},
		letter : function(param, handler) {
			sendQuery(dao.letter, param, handler);
		},
		view : function(param, handler) {
			sendQuery(dao.view, param, handler);
		},
		write : function(param, handler) {
			handler(dummy.result_succeed);
		},
		comment : function(param, handler) {
			handler(dummy.comment);
		},
		userinfo : function(param, handler) {
			handler(dummy.userinfo);
		}
	};
})();

