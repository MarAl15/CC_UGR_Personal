
//Class IssueManager
function IssueManager(){
	this.issues = new Map();
}

IssueManager.prototype.addIssue = function(chat_id, issue ){
	//If the chat_id is new
	if( this.issues.has(chat_id))
		this.issues.get(chat_id).push(issue);
	else
		this.issues.set(chat_id,[issue]);

};

IssueManager.prototype.getIssues = function(chat_id){
	var iss = [];
	if(this.issues.has(chat_id))
		iss = this.issues.get(chat_id);

	return iss;
};

IssueManager.prototype.getNIssues = function(chat_id){
	var len = 0;
	if(this.issues.has(chat_id))
		len = this.issues.get(chat_id).length;
	return len;
};

IssueManager.prototype.getLastIssue = function(chat_id){
	var iss ='';
	if(this.issues.has(chat_id))
		iss = this.issues.get(chat_id)[this.issues.get(chat_id).length -1];


	return iss;
};

IssueManager.prototype.deleteIssue = function(chat_id, issue_id){

	if(this.issues.has(chat_id))
		this.issues.get(chat_id).splice(issue_id,1);

};



module.exports = IssueManager;
