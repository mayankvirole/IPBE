const mongoose = require("mongoose");

const issueSchema = mongoose.Schema({
	title : {
		type : String,
		required : [true]
	},

	desc : {
		type : String,
		required : [true]
	},

	createdAt : {
		type : Date,
		default:	Date.now()
	},

	author : 
	{		
		id: {
			type : mongoose.Schema.Types.ObjectId,
			ref : 'User'
		},
		username: String
	},

	comments : [],
	images : [],
	resolved : {
		type : Boolean,
		default : false,
		required : true
	}
})

module.exports = mongoose.model("Issue", issueSchema);