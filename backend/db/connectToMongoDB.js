import mongoose from 'mongoose'
import chalk from 'chalk'

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(chalk.blue('Подключено к MongoDB'))
  } catch (error) {
    console.log(chalk.gray('Ошибка подключения к MongoDB', error.message))
  }
}

export default connectToMongoDB

// из приложения на Next.js
// import mongoose from 'mongoose'

// const connection = {}

// export const connectToDB = async () => {
//   try {
//     if (connection.isConnected) return
//     const db = await mongoose.connect(process.env.MONGO)
//     connection.isConnected = db.connections[0].readyState
//   } catch (error) {
//     console.log(error)
//     throw new Error(error)
//   }
// }

// из приложения на Next.js TS
// import mongoose, { Connection } from 'mongoose'

// let cachedConnection

// export async function connectToMongoDB() {
//   if (cachedConnection) {
//     console.log('Использование кэшированного соединения MONGODB')
//     return cachedConnection
//   }
//   try {
//     const conn = await mongoose.connect(process.env.MONGO as string)
//     cachedConnection = conn.connection

//     console.log('Установлено новое соединение с mongodb')
//     return cachedConnection
//   } catch (error) {
//     console.log('ЖУТКАЯ ошибка', error)

//     throw error
//   }
// }
