const Issue = require("../models/Issue");
const url = require('url');

exports.createNewIssue = async (req, res) => {
	try{
		let isIssue = await Issue.find({title : req.body.title})
		if(isIssue.length >= 1){
			return res.status(409).json({
				message : "issue already created with a matching title"
			});
		}

		const issue = new Issue({
			title : req.body.title,
			desc : req.body.desc,
			author : {
				id : req.body.author.id,
				username : req.body.author.username
			}
		})

		let data = await issue.save();
		res.status(201).json({data});
	} catch(err){
		res.status(400).json({err : err});
	}
}

exports.getIssueById = async (req,res) => {
	try{
		const queryObject = url.parse(req.url, true).query;
		let Is = await Issue.findById(queryObject.id);
		res.status(201).json({Is});
	} 

	catch(err){
		res.status(400).json({err : err});
	}
}

exports.getIssuesByUser = async (req,res) => {
	try{
		let Issues = await Issue.find({"author.username" : req.body.username });
		res.status(201).json({Issues});
	}
	catch (err) {
		res.status(400).json({err : err});
	}
}

exports.getAllIssues =  async (req,res) => {
	try{
		let Issues = await Issue.find({})
		res.status(201).json({Issues});
	} catch(err) {
		res.status(400).json({err : err});
	}
}

exports.updateIssue = async ( req, res) => {
	try{
		const val =  [...req.body.comments]
		let Is = await Issue.updateOne( {_id : req.body._id}, { $set : {comments : val  , resolved : req.body.resolved}});
		res.status(201).json({Is});
	}
	catch(err){
		res.status(400).json({err : err});
	}
}

exports.editIssue = async (req, res) => {
	try{
		const queryObject = url.parse(req.url, true).query;
		let Is = await Issue.updateOne({ _id : queryObject.id }, { $set : {
			title : req.body.title,
			desc : req.body.desc
		}})
		res.status(201).json({Is});
	}
	catch(err){
		res.status(400).json({err : err});
	}
}

exports.deleteIssue = async (req, res) => {
	try{
		const queryObject = url.parse(req.url, true).query;
		console.log(queryObject);
		let Is = await Issue.deleteOne({_id : queryObject.id});
		if(Is.ok)
		res.status(201).json({"success" : "Issue deleted."})
	}
	catch(err){
		res.status(400).json({err : err});
	}
}