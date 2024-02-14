import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
// import generateTokenAndSetCookie from '../utils/generateToken.js'
import chalk from 'chalk'

// просто так мы не можем получить данные из request, нужно промежуточное по
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body
    // 34:06
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Пароли не совпадают' })
    }

    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({ error: 'Имя пользователя уже занято' })
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
    })

    // console.log(chalk.yellow(newUser))

    if (newUser) {
      // Generate JWT token here
      // generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
      })
    } else {
      res.status(400).json({ error: 'Неверные данные пользователя' })
    }
  } catch (error) {
    console.log('Ошибка в контроллере регистрации', chalk.red(error.message))
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

// export const login = async (req, res) => {
//   try {
//     const { username, password } = req.body
//     const user = await User.findOne({ username })
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       user?.password || ''
//     )

//     if (!user || !isPasswordCorrect) {
//       return res.status(400).json({ error: 'Invalid username or password' })
//     }

//     generateTokenAndSetCookie(user._id, res)

//     res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       username: user.username,
//       profilePic: user.profilePic
//     })
//   } catch (error) {
//     console.log('Error in login controller', error.message)
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// }

// export const logout = (req, res) => {
//   try {
//     res.cookie('jwt', '', { maxAge: 0 })
//     res.status(200).json({ message: 'Logged out successfully' })
//   } catch (error) {
//     console.log('Error in logout controller', error.message)
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// }

// import chalk from 'chalk'

// export const signup = (req, res) => {
//   console.log(chalk.bgGray('signUpUse'))
//   res.send('Ну вот ты и зарегистрировался')
// }
// export const login = (req, res) => {
//   console.log(chalk.bgGray('loginUser'))
//   res.send('Ну вот ты и вошел')
// }
// export const logout = (req, res) => {
//   console.log(chalk.bgGray('logoutUser'))
//   res.send('Ну вот ты и вышел')
// }

// {
//   "fullName": "Art",
//   "username": "Alex",
//   "password": "123456",
//   "confirmPassword": "123456",
//   "gender": "male"
// }
