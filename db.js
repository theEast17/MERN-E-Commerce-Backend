import mongoose from "mongoose";
const mongoUrl='mongodb://127.0.0.1:27017/ecomstore'

const connectDb=async()=>{
    try {
        await mongoose.connect(mongoUrl);
        console.log(`MongoDb Connected`)
      } catch (err) {
        console.log("failed to connect",err);
      }
      
}

export default connectDb