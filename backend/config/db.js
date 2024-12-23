import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sunilsahoo:Sunil7029@cluster0.kaxxa.mongodb.net/food-del').then(() => console.log("DB Connected......."));
}