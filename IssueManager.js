
//Class IssueManager
function IssueManager(){
	this.issues = new Map();
}

IssueManager.prototype.addIssue = function(id, issue ){
	//If the id is new
	if( this.issues.has(id))
		this.issues.get(id).push(issue);
	else
		this.issues.set(id,[issue]);

};

IssueManager.prototype.getIssues = function(id){
	var iss = [];
	if(this.issues.has(id))
		iss = this.issues.get(id);

	return iss;
};

IssueManager.prototype.getNIssues = function(id){
	var len = 0;
	if(this.issues.has(id))
		len = this.issues.get(id).length;
	return len;
};

IssueManager.prototype.getLastIssue = function(id){
	var iss ='';
	if(this.issues.has(id))
		iss = this.issues.get(id)[this.issues.get(id).length -1];


	return iss;
};

IssueManager.prototype.deleteIssue = function(id, issue_id){

	if(this.issues.has(id)){
		if(this.issues.get(id).length == 1 && issue_id == 0){
			this.issues.delete(id);
			console.log("Deleted id");
		}
		else{
			this.issues.set(id,this.issues.get(id).splice(issue_id,1));
			console.log("Deleted issue");

		}
	}
};

IssueManager.prototype.existID = function(id){

	return this.issues.has(id)

}



module.exports = IssueManager;
