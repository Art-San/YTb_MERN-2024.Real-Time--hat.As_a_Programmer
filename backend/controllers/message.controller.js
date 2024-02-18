import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js'
import chalk from 'chalk'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    // await conversation.save();
    // await newMessage.save();

    // это будет работать параллельно
    await Promise.all([conversation.save(), newMessage.save()])

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() используется для отправки событий конкретному клиенту
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    console.log('Ошибка в контроллере sendMessage: ', chalk.red(error.message))
    res.status(500).json({ error: 'Внутренняя ошибка сервера-Бек' })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user._id

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate('messages') // НЕ ССЫЛКА, А актуальные СООБЩЕНИЯ

    if (!conversation) return res.status(200).json([])

    const messages = conversation.messages

    res.status(200).json(messages)
  } catch (error) {
    console.log('Ошибка в контроллере getMessages: ', error.message)
    res.status(500).json({ error: 'Внутренняя ошибка сервера-Бек' })
  }
}
