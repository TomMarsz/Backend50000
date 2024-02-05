import mongoose from 'mongoose'

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
	user: String,
	message: String,
	status: {
		type: Boolean,
		default: true
	},
	createdAt: Date,
  updatedAt: Date
})

const Message = mongoose.model(messageCollection, messageSchema)

export default Message