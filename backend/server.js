import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import chalk from 'chalk'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js'
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

dotenv.config()

app.use(express.json()) // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser())

app.use('/api/auth', authRoutes)
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

server.listen(PORT, () => {
  connectToMongoDB()
  console.log(`Server Running on port ${PORT}`)
})

// import express from 'express'
// import dotenv from 'dotenv'
// import chalk from 'chalk'
// import authRoutes from './routes/auth.routes.js'
// const app = express()

// dotenv.config()
// const PORT = process.env.PORT || 5000

// app.get('/', (req, res) => {
//   // root route http://localhost:5000
//   res.send('Hello word')
// })

// // app.use('/api/auth/', (req, res) => {
// //   console.log('signup login') res.send('Ну вот ты и попал')
// // })

// app.use('/api/auth', authRoutes)
// // app.use("/api/messages", messageRoutes);
// // app.use("/api/users", userRoutes);

// app.listen(PORT, () =>
//   console.log(chalk.bgBlue(`Server Running on port ${PORT}`))
// )
