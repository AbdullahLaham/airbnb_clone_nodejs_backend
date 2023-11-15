import mongoose from "mongoose"

export const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Successully");
    } catch (error) {
        console.log("Database Error");
    } 
}



