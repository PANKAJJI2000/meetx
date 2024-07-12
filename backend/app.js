import express from "express";
import {createServer} from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connect } from "node:http2";
import cors from "cors";

import connectToSocket from "./src/controllers/socketManager.js";
import userRouter from './src/routes/users.routes.js';



const app  = express();
const server = createServer(app);
const io = connectToSocket(server);



app.set("port",(process.env.PORT || 3000));
app.use(cors());
app.use(express.json({limit:"40Kb"}));
app.use(express.urlencoded({limit:"40kb" , extended:true}))





//for main page route
// app.use("/home",indexRouter);

//for user routes
app.use("/api/v1/users",userRouter);




//server starting and database connection
const start = async () =>{
    const connectionDb = await mongoose.connect("mongodb+srv://Ashu_videoCall:Ashu0432@cluster0.omojqph.mongodb.net/")
    console.log(`Mongo connected Db host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("Listening on port 3000");
    });
}

start();

