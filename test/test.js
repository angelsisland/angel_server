'use strict';

// --------------------------------
//  Test test
// --------------------------------

QUnit.test( 'api/login(new) test', function( assert ) {
	assert.expect(1);
	var done = assert.async();
	var postData = { authkey : '{access-token}', name : "NewAngel" };

	$.ajax({
		url : '/api/login',
		type : 'POST',
		data : JSON.stringify(postData),
		datatype : 'json'
	}).done(function(data) {
		console.log('api/login test :\n' + data.replace(/\\n/g, "\n"));
		assert.equal( JSON.parse(data).result, 'succeed', 'api/login error' );
		done();
	});
});

QUnit.test( 'api/login test', function( assert ) {
	assert.expect(1);
	var done = assert.async();
	var postData = { authkey : '{access-token}' };

	$.ajax({
		url : '/api/login',
		type : 'POST',
		data : JSON.stringify(postData),
		datatype : 'json'
	}).done(function(data) {
		console.log('api/login test :\n' + data.replace(/\\n/g, "\n"));
		assert.equal( JSON.parse(data).result, 'succeed', 'api/login test' );
		done();
	});
});

QUnit.test( 'api/need test', function( assert ) {
	assert.expect(1);
	var done = assert.async();
	var postData = { category : 'solace' };

	$.ajax({
		url : '/api/need',
		type : 'POST',
		data : JSON.stringify(postData),
		datatype : 'json'
	}).done(function(data) {
		console.log('api/need test :\n' + data.replace(/\\n/g, "\n"));
		assert.notEqual( JSON.parse(data).length, 0, 'api/need test' );
		done();
	});
});

QUnit.test( 'api/mypost test', function( assert ) {
	assert.expect(1);
	var done = assert.async();
	var postData = { category : 'solace' };

	$.ajax({
		url : '/api/mypost',
		type : 'POST',
		data : JSON.stringify(postData),
		datatype : 'json'
	}).done(function(data) {
		console.log('api/mypost test :\n' + data.replace(/\\n/g, "\n"));
		assert.notEqual( JSON.parse(data).length, 0, 'api/mypost test' );
		done();
	});
});

QUnit.test( 'api/letter test', function( assert ) {
	assert.expect(1);
	var done = assert.async();

	$.ajax({
		url : '/api/letter',
		type : 'GET',
	}).done(function(data) {
		console.log('api/letter test :\n' + data.replace(/\\n/g, "\n"));
		assert.notEqual( JSON.parse(data).length, 0, 'api/letter test' );
		done();
	});
});

QUnit.test( 'api/view test', function( assert ) {
	assert.expect(1);
	var done = assert.async();
	var postData = { id : 1 };

	$.ajax({
		url : '/api/view',
		type : 'POST',
		data : JSON.stringify(postData),
		datatype : 'json'
	}).done(function(data) {
		console.log('api/view test :\n' + data.replace(/\\n/g, "\n"));
		assert.notEqual( JSON.parse(data).length, 0, 'api/view test' );
		done();
	});
});

QUnit.test( 'api/write test', function( assert ) {
	assert.expect(1);
	var done = assert.async();
	var postData = { category : 'solace', writer : 'TestAngel1', title : 'Test Title', contents : 'blah\nblah\nblah...' };

	$.ajax({
		url : '/api/write',
		type : 'POST',
		data : JSON.stringify(postData),
		datatype : 'json'
	}).done(function(data) {
		console.log('api/write test :\n' + data.replace(/\\n/g, "\n"));
		assert.equal( JSON.parse(data).result, 'succeed', 'api/write test' );
		done();
	});
});

