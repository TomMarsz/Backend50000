import { Router } from "express";
import HTTP_RESPONSES from "../constants/http-responses.constant.js";

const messagesController = Router()

messagesController.get('/', async (req, res) => {
  try {
    res.status(HTTP_RESPONSES.SUCCESS).render('chats.handlebars', {title: 'Challenge05: WebsocketsHandlebars', style: 'chats.css'})
  } catch (error) {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
})

export default messagesController