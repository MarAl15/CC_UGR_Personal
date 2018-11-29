var request = require('supertest');
var app = require('../IssueBot');
var IssueManager = require('../IssueManager');
const assert = require('assert');


//==================== Server tests ====================

describe('Server test', function() {

	it('responds {"status":"OK"} to /', function (done){
		request(app)
		.get('/')
		.set('Accept', 'application/json')
		.expect('Content-Type',/json/)
		.expect(200)
		.end(function(err,result){
			assert.equal(result.body.status, "OK");
		});
		done();

	});

	it('responds with the issues to /see_issues', function(done){
		request(app)
		.get('/see_issues/randomid')
		.set('Accept', 'application/json')
		.expect('Content-Type',/json/)
		.expect(200)
		.end(function(err,result){
			assert.equal(result.body.size, 0);
		});
		done();

	});


});


//==================== IssueManager tests ====================

describe('IssueManager test', function() {

	var iss = new IssueManager();
	var chat_id = 1111;

	it( 'get 0 issues when there is no issues' , function(done){
		assert.equal(iss.getIssues(chat_id).length, 0);
		done();
	});

	it( 'add issue properly', function(done){

		iss.addIssue(chat_id,"test");
		var result = iss.getIssues(chat_id);
		assert.equal(result.length,1);
		assert.equal(result[0],"test");
		done();

	});

	it( 'get the number of issues', function(done){
		assert.equal(iss.getNIssues(chat_id), 1);
		done();
	});

	it( 'get the last issue', function(done){
		var result = iss.getLastIssue(chat_id);
		assert.equal(result, "test");
		done();
	});

	it( 'delete the issue', function(done){
		iss.deleteIssue(chat_id, 0);
		assert.equal(iss.getNIssues(chat_id), 0);
		done();
	});


});
