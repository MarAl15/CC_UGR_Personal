
//Class IssueManager

function IssueManager(){
	this.n_Issue = 0;
	this.issues = [];
}

IssueManager.prototype.addIssue = function(issue){
	this.n_Issue = this.n_Issue + 1;
	this.issues = this.issues.concat("#" + this.n_Issue + " " + issue);
};

IssueManager.prototype.getIssues = function(){
	return this.issues;
};

IssueManager.prototype.getNIssues = function(){
	return this.issues.length;
};

IssueManager.prototype.getLastIssue = function(){
	return this.issues[this.issues.length -1];
};



module.exports = IssueManager;
