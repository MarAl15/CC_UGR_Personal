//Creating the log system
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const logger = createLogger({
  level: 'info',
	format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

//Create the logs
logger.error("Error log initialized");
logger.info("Combined log initialized");



//Webapp initialization
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Import the IssueManager
const IssueManager = require('./IssueManager');

if(process.argv[2] == "production")
  var iss = new IssueManager(true);
else
  var iss = new IssueManager(false);



//Seting the ports to the app
var port = process.env.PORT || 80;
var admin_port = process.env.PORT || 5000;

//Check wether the app it's going to be tested or deployed
if(process.argv[2] == "production")
  app.set('port', port);
else
  app.set('port', admin_port)

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



//Adding functions to the app
app.get('/', function (req, res) {

	var msg = {
   			"status": "OK",
   			"ejemplo": {
				    "ruta": "/issue/foo",
                		    "valor": { "msg" : "Not found" }
				   }
		   }
  res.status(200);
	res.send(msg);
});



//See the issues of an user
app.get('/issue/:userid', function (req, res) {

	iss.getIssues(req.params.userid).then(function(issues){

    var resjson = { "size" : issues.length };
    if( issues.length > 0 ){
      for( i = 0; i < issues.length; i++ )
        resjson["Issue #" + issues[i].issueid] = issues[i].issue;
      res.status(200);
      res.send(resjson);
    }
    else {
      res.status(404);
      res.send({"msg": "Not found"});
      logger.info("No issues for the id " + req.params.userid);
    }

  },function(err){console.log(err)})

});
//Add a new issue for the id
app.post('/issue/:userid/:issue', function(req,res){

    iss.addIssue(req.params.userid, req.params.issue);
    res.status(201); //Resource created
    res.send("added");

});


//Remove an issue for the given id
app.delete('/issue/:userid/:issueid', function(req,res){

  var userid = req.params.userid;
  var issueid = Number(req.params.issueid);
  if(iss.existID(userid,issueid)){
    iss.deleteIssue(userid,issueid);
    res.status(200);
    res.send("deleted");
  }

  else{

    res.status(404);
    res.send('Not found');
    logger.error(id + " not exists");
  }

});

//Get the error log
var fs = require('fs');//File reader

app.get('/errorlog/:lines',function(req,res){

  //Extract the lines param
  var n_line = parseInt(req.params.lines,10);
  if (n_line > 0){
    //Read asynchronously the file
    fs.readFile('error.log', 'utf8', (err, data) => {

      if (err){
        res.status(500);
        res.send('An error ocurred during retrieving the error log file');
        logger.error("Couldn't get the error log file.")
      }
      else {
        //Split the data in lines
        var lines = data.toString('utf-8').split("\n");
        //Get the number of lines
        var lines_size = lines.length;
        //If the desired amount of lines is bigger than the total we use the total
        if(n_line > lines_size)
          n_line = lines_size;
        //Index where we start reading lines
        var i_start = lines_size - n_line;
        //Variable where we store the lines
        var ret = lines[i_start] + "\n";
        //Take the last n_lines of the file
        for( i = i_start; i < lines_size; i++){
          ret += lines[i] + "\n";
        }

        //Return the result
        res.status(200);
        res.send(ret);
      }
    });
  }//line > 0
  else{
    res.status(200);
    res.send("");
  }

});

//Get the combined log
app.get('/combinedlog/:lines',function(req,res){

  //Extract the lines param
  var n_line = parseInt(req.params.lines,10);
  if (n_line > 0){
    //Read asynchronously the file
    fs.readFile('combined.log', 'utf8', (err, data) => {

      if (err){
        res.status(500);
        res.send('An error ocurred during retrieving the combined log file');
        logger.error("Couldn't get the combined log file.")
      }
      else {
        //Split the data in lines
        var lines = data.toString('utf-8').split("\n");
        //Get the number of lines
        var lines_size = lines.length;
        //If the desired amount of lines is bigger than the total we use the total
        if(n_line > lines_size)
          n_line = lines_size;
        //Index where we start reading lines
        var i_start = lines_size - n_line;
        //Variable where we store the lines
        var ret = lines[i_start] + "\n";
        //Take the last n_lines of the file
        for( i = i_start; i < lines_size; i++){
          ret += lines[i] + "\n";
        }

        //Return the result
        res.status(200);
        res.send(ret);
      }
    });
  }//line > 0
  else{
    res.status(200);
    res.send("");
  }

});


app.get('*', function(req, res){
  res.send('NOT FOUND', 404);
});


//Start the app
var server = app.listen(app.get('port'), function () {
  console.log('App listening on port ' + app.get('port'));
	logger.info('App listening on port ' + app.get('port'));
});


module.exports = server
