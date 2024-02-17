import User from '../models/user.model.js'
import chalk from 'chalk'

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }
    }).select('-password')

    res.status(200).json(filteredUsers)
  } catch (error) {
    console.log('Ошибка в getUsersForSidebar: ', chalk.red(error.message))
    res.status(500).json({ error: 'Внутренняя ошибка сервера-Бек' })
  }
}
