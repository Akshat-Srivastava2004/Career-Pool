import express from "express";
import cors from "cors";
import {Server}  from "socket.io";
import cookieParser from "cookie-parser";
import routerjobseekers from "./routes/jobseeker.routes.js";
import routercompany from "./routes/company.routes.js";
import adminrouter from "./routes/admin.routes.js";
import { chatrouter } from "./routes/chat.routes.js";
console.log("inside the app.js file");
// MIDDLEWARE




const app=express()



app.use(cors({
  origin: ['https://careerpool-frontend.netlify.app', 'http://localhost:5000'], // Allow these origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials
}));
// app.use(
//     session({
//         secret: process.env.SESSION_SECRET || "Iwn3q3HkVF",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             maxAge: 24 * 60 * 60 * 1000, // 1 day
//         },
//     })
// );
app.use(express.json())
              // backend or server per jo date aaa raha hain vo json format me aa sakta hain aur uski limit 16kb))
app.use(express.urlencoded({
    extended:true,                   //configuration -ye url ke liye jabh user url enter kar to jo data d
    limit:"16kb"                    // display hoga to upper jo url ayega usko manage kar le 
}))
 app.use(express.static("public"))   // access the file present in public 

app.use(cookieParser())             

app.use("/api/v1/company", routercompany);
app.use("/api/v1/jobseekers",routerjobseekers);
app.use("/api/v1/admin",adminrouter);
app.use("/api/v1/chat",chatrouter);
app.get("/", (req, res) => {
  res.send("Server is running!");
});
  
export { app };