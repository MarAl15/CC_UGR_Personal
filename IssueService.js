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



//Webapp initialization
var express = require('express');
var app = express();

//Import the IssueManager
const IssueManager = require('./IssueManager');
var iss = new IssueManager();


//Seting the ports to the app
var port = process.env.PORT || 5000;
app.set('port', port);
app.use(express.static(__dirname + '/public'));



//Adding functions to the app
app.get('/', function (req, res) {

	var n = iss.getNIssues();
	var msg = {
   			"status": "OK",
   			"ejemplo": {
				    "ruta": "/see_issues",
                		    "valor": { "size" : n }
				   }
		   }
	res.send(msg);
});


app.get('/see_issues/:id', function (req, res) {

	var issues = iss.getIssues(req.params.id);
	var resjson = { "size" : issues.length };
	if( issues.length > 0 )
		for( i = 0; i < issues.length; i++ )
			resjson["Issue #" + (i+1)] = issues[i];
	else {
		logger.info("No issues for the requeste")
	}


	res.send(resjson);

});



//Start the app
var server = app.listen(app.get('port'), function () {
  console.log('App listening on port ' + app.get('port'));
	logger.info('App listening on port ' + app.get('port'));
});

module.exports = server
