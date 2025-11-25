import mongoose from "mongoose";

export const connectToMongoDB = async () => {

    const uri = process.env.MONGO_URI;
    
    if (!uri) {
        throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI || "");
}