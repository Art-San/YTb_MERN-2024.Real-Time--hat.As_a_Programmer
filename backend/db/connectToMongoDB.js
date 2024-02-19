import mongoose from 'mongoose'
import chalk from 'chalk'

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(chalk.blue('Подключено к MongoDB'))
  } catch (error) {
    console.log('Ошибка подключения к MongoDB', chalk.red(error.message))
  }
}

export default connectToMongoDB
