import mongoose from 'mongoose';
 

const connectDB = async () => {
  try {
   const conn= await mongoose.connect(process.env.MONGO_URL);
    console.log(`Conected to mongodb database ${conn.connection.host}`.bgCyan.white);
  } catch (err) {
    console.error(` error in mongodb ${err}`.bgRed.white);
    
    process.exit(1);
  }
}

export default connectDB;