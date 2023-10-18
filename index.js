//import dotenv from "dotenv";

import mongoose from 'mongoose';
import  express  from 'express';
import userRouter from './Routes/routes.js';
const app=express();
app.use(express.json());
app.use("/gift",userRouter);

mongoose.connect('mongodb+srv://ivanherald:1234567!@gift.wuldils.mongodb.net/?retryWrites=true&w=majority'
).then(()=>
    app.listen(5000,()=>
     console.log("Connected to Database And Server is running")
     )
    ).catch(e=>console.log(e));
