const mongoose = require('mongoose')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const User = new mongoose.Schema(
	{
		username: { type: String, required: true },
		fullname: { type: String},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		bio:{type: String },
		image:
    {
        url: String,
        filename: String
    }
    ,
	
		// quote: { type: String },
		// image:{type:String}
        // username:String,
		// email: String,
		// password:String
		
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model


