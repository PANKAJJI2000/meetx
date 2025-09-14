import express from "express";
import {createServer} from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import cors from "cors";

import connectToSocket from "./src/controllers/socketManager.js";
import userRouter from './src/routes/users.routes.js';

const app  = express();
app.set("port",(process.env.PORT || 3000));

const server = createServer(app);
const io = connectToSocket(server);


app.use(cors());
app.use(express.json({limit:"40Kb"}));
app.use(express.urlencoded({limit:"40kb" , extended:true}))

// Add root route handler
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Desi Talks API is running successfully!",
        version: "1.0.0",
        endpoints: {
            users: "/api/v1/users"
        }
    });
});



//for user routes
app.use("/api/v1/users",userRouter);




//server starting and database connection
const start = async () =>{
    const connectionDb = await mongoose.connect("mongodb+srv://desitalk:SUe4kxJxfvp9yjxj@cluster0.cccse2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`Mongo connected Db host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("Listening on port 3000");
    });
}

start();

