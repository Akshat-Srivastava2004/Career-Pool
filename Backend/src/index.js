import dotenv from "dotenv";
import connectDB from "./Database/index.js";
import { app } from "./app.js";
import { handleSocketConnection } from "./controllers/chat_controller.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config({ path: "./.env" });
import process from "process";

// Create HTTP Server
const server = http.createServer(app);

// Initialize WebSocket Server
const io = new Server(server, {
    cors: {
        origin: ['https://careerpool-frontend.netlify.app'], // Adjust to your frontend URL
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Call WebSocket handler function
handleSocketConnection(io);




// Connect MongoDB, then start server
connectDB()
    .then(() => {
        server.listen(process.env.PORT,'0.0.0.0', () => {  // Use `server.listen`, not `app.listen`
            console.log(`🚀 Server running on port: ${process.env.PORT || 6000}`);
        });
    })
    .catch((err) => {
        console.log("❌ MongoDB connection failed !!!", err);
    });
