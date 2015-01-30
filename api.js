'use strict';

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

	return {
		setname : function() {
			return dummy.result_succeed;
		},
		need : function() {
			return dummy.post;
		},
		mypost : function() {
			return dummy.post;
		},
		letter : function() {
			return dummy.post;
		},
		view : function() {
			return dummy.comment;
		},
		write : function() {
			return dummy.result_succeed;
		},
		comment : function() {
			return dummy.comment;
		},
		userinfo : function() {
			return dummy.userinfo;
		}
	};
})();

