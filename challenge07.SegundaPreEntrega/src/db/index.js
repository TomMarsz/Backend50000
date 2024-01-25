import mongoose from 'mongoose'

const mongoConnect = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.ckyvij9.mongodb.net/?retryWrites=true&w=majority')
    console.log('db is connected');
  } catch (error) {
    console.log(error);
  }
}

export default mongoConnect