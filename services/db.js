import mongoose from "mongoose";

const uri = process.env.URI;
 
export async function connectDb() {
    try {
        const db = await mongoose.connect(uri)
        console.log('MongoDb connected successfully');
        
    } catch (error) {
       console.error(error);
    }
}

