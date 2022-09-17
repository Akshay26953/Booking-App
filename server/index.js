import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'
import cors from "cors";
const app = express();
dotenv.config();

const connet = async () => {
  try {
    await mongoose.connect(process.env.CONN_MONGO);
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected", ()=> {
    console.log("MongoDB disconnected");
})
mongoose.connection.on("connected", ()=> {
    console.log("MongoDB connected");
})
//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
//api config
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

const port = 8000;
app.listen(port, () => {
    connet()
    console.log(`Server connected at ${port}`)});
