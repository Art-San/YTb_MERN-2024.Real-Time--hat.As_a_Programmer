import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized – токен не предоставлен' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized – неверный токен' })
    }

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' })
    }

    req.user = user

    next()
  } catch (error) {
    console.log('Ошибка в middleware ProtectRoute: ', chalk.red(error.message))
    res.status(500).json({ error: 'Внутренняя ошибка сервера middleware' })
  }
}

export default protectRoute
