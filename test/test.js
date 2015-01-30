'use strict';

// --------------------------------
//  Test test
// --------------------------------
QUnit.test( 'api/need test', function( assert ) {
	assert.expect(1);
	var done = assert.async();
	var postData = { category : 'praise' };

	$.ajax({
		url : 'http://localhost:8080/api/need',
		type : 'POST',
		data : JSON.stringify(postData),
		datatype : 'json'
	}).done(function(data) {
		console.log('api/need test :');
		console.log(data.replace(/\\n/g, "\n"));
		assert.ok( true, 'api/need test' );
	});
});

