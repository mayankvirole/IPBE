const Comment = require("../models/Comment");

exports.addNewComment = async (req, res) => {
	try{
		const comment = new Comment({
			text : req.body.text,
			author : {
				id : req.body.author.id,
				username : req.body.author.username
			}
		})
		let data = await comment.save();
		res.status(201).json({data});
	} catch(err){
		res.status(400).json({err : err});
	}
}

exports.editComment = async (req, res) => {

}