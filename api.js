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
// Session module setup
// ----------------------------------------------------------------
container.deployModule('com.campudus~session-manager~2.0.1-final', {}, 1);

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
				var category = param.category ? param.category : 'solace';	// temp
				var writer = param.user_id ? param.user_id : '1';	// temp
				return {
					action : 'prepared',
					statement : 'SELECT post.id, post.writer, title, post.contents FROM post LEFT JOIN reply ON post.id = reply.post_id WHERE post.facebook_id<>? AND category=? GROUP BY post.id ORDER BY COUNT(reply.id) LIMIT 4',
					values : [writer, category]
				};
			},
			arr2obj : function(arr) {
				return { id : arr[0], writer : arr[1], title : arr[2], contents : arr[3], commentnum :0 };
			}
		},
		mypost : {
			query : function(param) {
				var category = param.category ? param.category : 'solace';	// temp
				var writer = param.user_id ? param.user_id : '1';	// temp
				return {
					action : 'prepared',
					statement : 'SELECT post.id, post.writer, title, post.contents, COUNT(reply.id) FROM post LEFT JOIN reply ON post.id = reply.post_id WHERE post.facebook_id=? AND category=? GROUP BY post.id LIMIT 5',
					values : [writer, category]
				};
			},
			arr2obj : function(arr) {
				return { id : arr[0], writer : arr[1], title : arr[2], contents : arr[3], commentnum : arr[4] };
			}
		},
		letter : {
			query : function(param) {
				return {
					action : 'prepared',
					statement : 'SELECT title, contents FROM post WHERE category=? LIMIT 8',
					values : ['letter']
				};
			},
			arr2obj : function(arr) {
				return { title : arr[0], contents : arr[1] };
			}
		},
		view : {
			query : function(param) {
				var id = param.id ? param.id : 1;		// for test
				return {
					action : 'prepared',
					statement : 'SELECT writer, contents FROM reply WHERE post_id=?',
					values : [id]
				};
			},
			arr2obj : function(arr) {
				return { writer : arr[0], contents : arr[1] };
			}
		},
		write : {
			query : function(param) {
				var category = param.category;
				var facebook_id = param.user_id;
				var writer = 'TestAngel' + facebook_id;
				var title = param.title;
				var contents = param.contents;
				return {
					action : 'insert',
					table : 'post',
					fields : ['category', 'facebook_id', 'writer', 'title', 'contents'],
					values : [[category, facebook_id, writer, title, contents]]
				};
			}
		},
		comment : {
			query : function(param) {
				var post_id = param.post_id;
				var facebook_id = param.user_id;
				var writer = 'TestAngel' + facebook_id;
				var contents = param.contents;
				return {
					action : 'insert',
					table : 'reply',
					fields : ['post_id', 'facebook_id', 'writer', 'contents'],
					values : [[post_id, facebook_id, writer, contents]]
				};
			}
		},
		userinfo : {
			query : function(param) {
				var id = param.user_id ? param.user_id : '1';		// for test
				return {
					action : 'prepared',
					statement : 'SELECT nickname, point FROM user WHERE facebook_id=?',
					values : [id]
				};
			},
			arr2obj : function(arr) {
				var point = arr[1];
				var level = 0;
				if (point > 10) {
					point -= 10;
					level++;
				}
				if (point > 100) {
					point -= 100;
					level++;
				}
				if (point > 1000) {
					point -= 1000;
					level++;
				}
				return { nickname : arr[0], level : level, point : point };
			}
		}
	};

	function selectQuery(dao, param, handler) {
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

	function insertQuery(dao, param, handler) {
		console.log('Query : ' + JSON.stringify(dao.query(param)));
		vertx.eventBus.send('campudus.asyncdb', dao.query(param), function(reply) {
			var result = {};
			if (reply.status === 'ok') {
				result.result = "succeed";
			} else {
				result.result = "failed";
				result.error = "Unknown error";
				console.log('DB Error : ' + JSON.stringify(reply).replace(/\\n/g, "\n"));
			}
			handler(result);
		});
	}

	return {
		login : function(param, handler) {
			var id = param.id ? param.id : 1;
			var query = {
				action : 'prepared',
				statement : 'SELECT nickname FROM user WHERE facebook_id=?',
				values : [id]
			};

			console.log('Query : ' + JSON.stringify(query));
			vertx.eventBus.send('campudus.asyncdb', query, function(reply) {
				reply.status = 'ok';
				reply.results = [['testnick']];
				if (reply.status === 'ok' && reply.results.length == 1) {
					var nickname = reply.results[0][0];
				} else {
					console.log('DB Error : ' + JSON.stringify(reply).replace(/\\n/g, "\n"));
				}
				handler(dummy.result_succeed, id);
			});
		},
		need : function(param, handler) {
			selectQuery(dao.need, param, handler);
		},
		mypost : function(param, handler) {
			selectQuery(dao.mypost, param, handler);
		},
		letter : function(param, handler) {
			selectQuery(dao.letter, param, handler);
		},
		view : function(param, handler) {
			selectQuery(dao.view, param, handler);
		},
		write : function(param, handler) {
			insertQuery(dao.write, param, handler);
		},
		comment : function(param, handler) {
			var id = param.userid ? param.userid : '1';
			var query = {
				action : 'prepared',
				statement : 'UPDATE user SET point=point+1 WHERE facebook_id=?',
				values : [id]
			};

			console.log('Query : ' + JSON.stringify(query));
			vertx.eventBus.send('campudus.asyncdb', query, function(reply) {
				if (reply.status === 'ok') {
					insertQuery(dao.comment, param, handler);
				} else {
					console.log('DB Error : ' + JSON.stringify(reply).replace(/\\n/g, "\n"));
					handler(dummy.result_failed, id);
				}
			});
		},
		userinfo : function(param, handler) {
			selectQuery(dao.userinfo, param, handler);
		}
	};
})();

