import express from "express";
import {createServer} from "node:http";
import path from "path";
import { fileURLToPath } from 'url';


import mongoose from "mongoose";
import cors from "cors";

import connectToSocket from "./src/controllers/socketManager.js";
import userRouter from './src/routes/users.routes.js';

const app  = express();
app.set("port",(process.env.PORT || 3000));

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(app);
const io = connectToSocket(server);

// Configure CORS properly
app.use(cors({
    origin: [
        "https://meetx-1-en8z.onrender.com", // Your frontend domain
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"]
}));

app.use(express.json({limit:"40Kb"}));
app.use(express.urlencoded({limit:"40kb" , extended:true}))

// Add request logging middleware for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    console.log('Request body:', req.body);
    next();
});

// Serve static files from frontend build (only in production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// API routes
app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Desi Talks API is running successfully!",
        version: "1.0.0",
        endpoints: {
            users: "/api/v1/users"
        }
    });
});

//for user routes
console.log('Registering user router...');
app.use("/api/v1/users", userRouter);
console.log('User router registered successfully');

// Add a test endpoint to verify API is working
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!", timestamp: new Date().toISOString() });
});

// Serve frontend for all non-API routes (only in production)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    });
} else {
    // In development, show API info for root route
    app.get("/", (req, res) => {
        res.status(200).json({
            message: "Desi Talks API is running successfully!",
            version: "1.0.0",
            endpoints: {
                users: "/api/v1/users"
            }
        });
    });
}

// Add error handling middleware (moved after routes)
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

//server starting and database connection
const start = async () => {
    try {
        const connectionDb = await mongoose.connect("mongodb+srv://desitalk:SUe4kxJxfvp9yjxj@cluster0.cccse2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log(`Mongo connected Db host: ${connectionDb.connection.host}`);
    } catch (error) {
        console.error("Database connection failed:", error);
        // Continue without database for now
    }
    
    server.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port")}`);
        console.log(`API available at: http://localhost:${app.get("port")}/api/v1/users`);
        
        // Log registered routes for debugging
        console.log('\nRegistered routes:');
        app._router.stack.forEach(function(r){
            if (r.route && r.route.path){
                console.log(`${Object.keys(r.route.methods).join(',').toUpperCase()} ${r.route.path}`);
            } else if (r.name === 'router') {
                console.log(`Router middleware at ${r.regexp}`);
            }
        });
    });
}

start();

