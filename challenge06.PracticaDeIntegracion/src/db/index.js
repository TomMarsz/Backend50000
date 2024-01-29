import mongoose from 'mongoose'
import { dbUser, dbPassword, dbHost, dbName } from "../configs/db.config.js"

const mongoConnect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`)
    console.log('DB is connected');
  } catch (error) {
    console.log(error);
  }
}

export default mongoConnect