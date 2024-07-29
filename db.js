/* eslint-disable no-undef */
import mongoose from "mongoose";
import {config as conf} from 'dotenv'
conf()

const mongoUrl= process.env.DATABASE_URL

const connectDb=async()=>{
    try {
        await mongoose.connect(mongoUrl);
        console.log(`MongoDb Connected`)
      } catch (err) {
        console.log("failed to connect",err);
      }
      
}

export default connectDb