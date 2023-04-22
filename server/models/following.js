const mongoose = require('mongoose')
var Schema = mongoose.Schema
ObjectId = Schema.ObjectId;

const Following = new mongoose.Schema(
	{
		userId: { type: ObjectId, required: true },
		following: [
            {
                id:ObjectId
            }
           ]		
	},
	{ collection: 'Following' }
)

const model = mongoose.model('Following', Following)

module.exports = model


