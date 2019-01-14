//The client that will connect to the mongo database
var MongoClient = require('mongodb').MongoClient;

//URL of the database
var url = "mongodb://10.0.0.4:27017/";
//Name of de database
var dbname = "IssueDB"
//Name of the collection
var colname = "issues"


//Class IssueManager
function IssueManager( production ){

	if(!production)
		url = "mongodb://localhost:27017/";

	//Connect to mongodb and create the database
	MongoClient.connect(url + dbname, function(err, db) {
	  if (err) throw err;
	  db.close();
	});

	//Create the collection "issues"
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db(dbname);
	  dbo.createCollection(colname,function(err, res) {
	    if (err) throw console.log(err);
	    db.close();
	  });
	});
}

IssueManager.prototype.addIssue = function(userid, issue ){

	getLastIssueID(userid).then(function(issueid){
		issueid = issueid +1;

		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db(dbname);
			var myobj = { userid: userid, issueid: issueid, issue: issue };
			dbo.collection(colname).insertOne(myobj, function(err, res) {
				if (err) throw err;
				db.close();
			});
		});

	},function(error){console.log(error)});

};

IssueManager.prototype.getIssues = function(userid){

	return new Promise(function(resolve,reject){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db(dbname);
		  dbo.collection(colname).find({userid: userid}).toArray(function(err, result) {
		    if (err) reject(err);
				db.close();
		    resolve(result);
		  });
		});
	})

};


IssueManager.prototype.deleteIssue = function(userid, issueid){

	MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db(dbname);
		  var myquery = { userid: userid, issueid: issueid };
		  dbo.collection(colname).deleteOne(myquery, function(err, obj) {
		    if (err) throw err;
		    db.close();
		  });
		});
};

//Function to see if an issue exists in the database
IssueManager.prototype.existID = function(userid, issueid){

	return new Promise(function(resolve,reject){

		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db(dbname);
		  var query = { userid: userid, issueid: issueid};
		  dbo.collection(colname).find(query).toArray(function(err, result) {
			    if (err) reject(err);
					db.close();
					resolve(result.length > 0);
			});

		});
	})
}

function getLastIssueID(userid){

	return new Promise(function(resolve,reject){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbname);
      var query = { userid: userid };
      dbo.collection(colname).find(query).toArray(function(err, result) {
        if (err) reject(err);
				var lastid = 0
				if(result.length != 0) lastid = result[result.length-1].issueid
				resolve(lastid);

        db.close();
      });
    })
  })
}


module.exports = IssueManager;
