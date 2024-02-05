import Message from "../models/message.model.js";

class MessageDAO {
  async getAll() {
    return await Message.find({ status: true })
  }

  async insertOne(newMessageInfo) {
    newMessageInfo.createdAt = new Date()
    newMessageInfo.updatedAt = new Date()
    return await Message.create(newMessageInfo)
  }
}

export default MessageDAO