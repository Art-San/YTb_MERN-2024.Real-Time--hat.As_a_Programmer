import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
const app = express()

dotenv.config()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  // root route http://localhost:5000
  res.send('Hello word')
})

// app.use('/api/auth/', (req, res) => {
//   console.log('signup login') res.send('Ну вот ты и попал')
// })

app.use('/api/auth', authRoutes)
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
