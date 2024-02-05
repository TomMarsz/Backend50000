import MessageDAOMongo from "../../DAO/mongo/message-dao.mongo.js"

const Message = new MessageDAOMongo()

const getAll = async () => {
  try {
    const messages = await Message.getAll()
    return messages
  } catch (error) {
    throw error
  }
}

const insertOne = async (newMessageInfo) => {
  try {
    const newMessage = await Message.insertOne(newMessageInfo)
    return newMessage
  } catch (error) {
    throw error
  }
}


export default {
  getAll,
  insertOne
}