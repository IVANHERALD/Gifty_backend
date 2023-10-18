//import dotenv from "dotenv";

import mongoose from 'mongoose';
import  express  from 'express';
import cors from 'cors';
import userRouter from './Routes/routes.js';
const app=express();
app.use(express.json());
const allowedOrigin = 'https://gifty-frontend.vercel.app';
const corsOptions = {
    origin: allowedOrigin,
  };
app.use(cors(corsOptions));


app.use("/gift",userRouter);

mongoose.connect('mongodb+srv://ivanherald:1234567!@gift.wuldils.mongodb.net/?retryWrites=true&w=majority'
).then(()=>
    app.listen(3000,()=>
     console.log("Connected to Database And Server is running")
     )
    ).catch(e=>console.log(e));
