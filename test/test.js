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
			.post('/issue')
			.send("id=0000&issue=test")
			.expect(201,done);

	});

	it('Gets the issues of an id with GET', function(done){
		request(app)
			.get('/issue/0000')
			.expect(function(res){
				if(res.body.size != 1) throw new Error("Could not get the issues for the id 1111");
			})
			.expect(200,done);
	});

	it('Deletes a issue for an id with DELETE', function(done){
		request(app)
			.delete('/issue')
			.send("id=0000&issue=0")
			.expect(200,done);


	});

	it('Deletes an id when there is no issues left', function(done){
		request(app)
			.get('/issue/0000')
			.expect(404,done);
	});

});


//==================== IssueManager tests ====================

describe('IssueManager test', function() {

	var iss = new IssueManager();
	var id = 1111;

	it( 'get 0 issues when there is no issues' , function(done){
		assert.equal(iss.getIssues(id).length, 0);
		done();
	});

	it( 'add issue properly', function(done){

		iss.addIssue(id,"test");
		var result = iss.getIssues(id);
		assert.equal(result.length,1);
		assert.equal(result[0],"test");
		done();

	});

	it( 'get the number of issues', function(done){
		assert.equal(iss.getNIssues(id), 1);
		done();
	});

	it( 'get the last issue', function(done){
		var result = iss.getLastIssue(id);
		assert.equal(result, "test");
		done();
	});

	it( 'delete the issue', function(done){
		iss.deleteIssue(id, 0);
		assert.equal(iss.getNIssues(id), 0);
		done();
	});


});
