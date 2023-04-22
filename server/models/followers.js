const mongoose = require('mongoose')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const Followers = new mongoose.Schema(
	{
		userId: { type: ObjectId, required: true },
		followers: [
            {
                id:ObjectId
            }
           ]		
	},
	{ collection: 'Followers' }
)

const model = mongoose.model('Followers', Followers)

module.exports = model


