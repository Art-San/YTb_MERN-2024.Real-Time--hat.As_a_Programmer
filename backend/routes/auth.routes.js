import express from 'express'
// import { login, logout, signup } from '../controllers/auth.controller.js'

const router = express.Router()

router.get('/signup', (req, res) => {
  res.send('Ну вот ты и зарегистрировался')
})
router.get('/login', (req, res) => {
  res.send('Ну вот ты и вошел')
})
router.get('/logout', (req, res) => {
  res.send('Ну вот ты и вышел')
})

export default router

// import express from 'express'
// import { login, logout, signup } from '../controllers/auth.controller.js'

// const router = express.Router()

// router.post('/signup', signup)

// router.post('/login', login)

// router.post('/logout', logout)

// export default router
