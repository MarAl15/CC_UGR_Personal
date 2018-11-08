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
		.get('/see_issues')
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

	it( 'get 0 issues when there is no issues' , function(done){
		assert.equal(iss.getIssues().length, 0);
		done();
	});

	it( 'add issue properly', function(done){
		
		iss.addIssue("test");
		var result = iss.getIssues();
		assert.equal(result.length,1);
		assert.equal(result[0],"#1 test");
		done();

	});

	it( 'get the number of issues', function(done){
		assert(iss.getNIssues(),1);
		done();	
	});

	it( 'get the last issue', function(done){
		var result = iss.getLastIssue();
		assert(result, "#1 test");
		done();
	});


});
