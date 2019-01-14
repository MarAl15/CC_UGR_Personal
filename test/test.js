var request = require('supertest');
var app = require('../IssueService');

var IssueManager = require('../IssueManager');
const assert = require('assert');


//==================== Server tests ====================

describe('Service test', function() {


	it('responds {"status":"OK"} to /', function (done){
		request(app)
			.get('/')
			.set('Accept', 'application/json')
			.expect('Content-Type',/json/)
			.expect(function(res){
				if( res.body.status != "OK" ) throw new Error ("The service is not OK");
			})
			.expect(200,done);

	});

	it('responds with no issues for a non registered id', function(done){
		request(app)
			.get('/issue/randomid')
			.expect(404,done)

	});

	it('adds a new issue with POST', function(done){
		request(app)
			.post('/issue/usertest/issuetest')
			.expect(201,done);

	});

	it('Gets the issues of an id with GET', function(done){
		request(app)
			.get('/issue/usertest')
			.expect(function(res){
				if(res.body.size == 0) throw new Error("Could not get the issues for the id usertest");
			})
			.expect(200,done);
	});

	it('Deletes a issue for an id with DELETE', function(done){
		request(app)
			.delete('/issue/usertest/1')
			.expect(200,done);


	});

	it('Returns the error log', function(done){
		request(app)
			.get('/errorlog/10')
			.expect(200,done);
	});

	it('Returns the combined log', function(done){
		request(app)
			.get('/combinedlog/10')
			.expect(200,done);
	});

});


//==================== IssueManager tests ====================

describe('IssueManager test', function() {

	var iss = new IssueManager(false);
	var userid = "usertest1";

	it( 'get 0 issues when there is no issues' , function(done){
		iss.getIssues(userid).then(function(result){assert.equal(result.length, 0)},
																function(err){throw new Error(err)});

		done();
	});

	it( 'add issue properly', function(done){

		iss.addIssue(userid,"test");
		iss.getIssues(userid).then(function(result){assert.equal(result.length, 1);
																								assert.equal(result[0],"test");},
																function(err){throw new Error(err)});
		done();

	});

	it( 'get the number of issues', function(done){
		iss.getIssues(userid).then(function(result){assert.equal(result.length, 1)},
																function(err){throw new Error(err)});
		done();
	});

	it( 'delete the issue', function(done){
		iss.deleteIssue(userid, 1);
		iss.getIssues(userid).then(function(result){assert.equal(result.length, 0)},
																function(err){throw new Error(err)});
		done();
	});


});
