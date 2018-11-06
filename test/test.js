const request = require('supertest');
const app = require('../IssueBot');


//==================== Server tests ====================

describe('Server status', function(done) {
	
	it('responds {"status":"OK"} to /', function (done){
		request(app)
		.get('/')
		.expect('Content-Type',/json/)
		.expect(200);
		
		done();
		
		

	});
	
	after(function (done) {
		
		app.stop();
		done();
		
		
	});


});
