import { Chat } from "../models/chat_model.js";
import { ApiError } from "../utils/ApiError.js";

import mongoose from "mongoose";
export const createchat = async (req, res) => {
    try {
        const { jobseekerId, companyId, currentUserType, text } = req.body;
        console.log("the ids are ", jobseekerId, companyId, currentUserType);

        if (!jobseekerId || !companyId) {
            return res.status(400).json({ message: "Both jobseekerId and companyId are required" });
        }

        const jobSeeker = jobseekerId;
        const company = companyId;

        // Find existing chat
        let chat = await Chat.findOne({ jobSeeker, company });
        if (!text) {
            console.log("❌ No text received in the request body.");
        } else {
            console.log("✅ Text received:", text);
        }
        if (chat) {
            // If chat exists, push a new message
            if (text) {
                console.log("text is coming ",text)
                console.log("Raw currentUserType:", currentUserType);
                console.log("Assigned senderType:", currentUserType.trim().toLowerCase() === "jobseeker" ? "Jobseekers" : "Company");
                chat.messages.push({
                    sender: currentUserType === "jobseeker" ? jobSeeker : company,
                    senderType: currentUserType.trim().toLowerCase() === "jobseeker" ? "Jobseekers" : "Company",
                    text,
                });
            }
            await chat.save();
        } else {
            console.log("Raw currentUserType:", currentUserType);
            console.log("Assigned senderType:", currentUserType.trim().toLowerCase() === "jobseeker" ? "Jobseekers" : "Company");
            // If chat does not exist, create a new one
            chat = await Chat.create({
                jobSeeker,
                company,
                messages: text
                    ? [
                          {
                              sender: currentUserType === "jobseeker" ? jobSeeker : company,
                              senderType: currentUserType.toLowerCase() === "jobseeker" ? "Jobseekers" : "Company",
                              
                              text,
                          },
                      ]
                    : [],
            });
        }

        res.status(201).json(chat);
    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ message: "Error creating chat", error: error.message });
    }
};

// to check the message history of a user and return all the details of person with whome  akshat talk 
export const getUserChats = async(req,res)=>{
    try {
        const {userId}=req.params;
        const chats=await Chat.find({
            $or:[{jobSeekers:userId},{compant:userId}],
        }).populate("Jobseekers company ","firstName,lastName,email")

        res.status(201).json(chats)
    } catch (error) {
        throw new ApiError(500,"Error while fetching the data ",error)
    }
}


// to fetch the chat on the basis of chatid whenever akshat will start chat it will fetch all the chats from the backend and it runs everytime 
export const getchatMessages=async(req,res)=>{
    try {
        const {chatId} = req.params;

        const chat=await Chat.findById(chatId).populate("messages.sender","firstName lastName,email")

        if(!chat) return res.status(404).json({error:"chat not found "})
            res.json(chat.messages)
    } catch (error) {
        throw new ApiError(500,"Error caught ",error)
    }
}

// WebSocket Handling
export const handleSocketConnection = (io) => {
    io.on("connection", (socket) => {
      console.log("✅ WebSocket Connected:", socket.id);
  
      // Listen for joining a chat room
      socket.on("join chat", (chatId) => {
        socket.join(chatId);
        console.log(`📢 Socket ${socket.id} joined chat room ${chatId}`);
      });
  
      socket.on("SendMessage", async ({ chatId, senderId, senderType, text }) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(chatId)) {
            console.error("Invalid chatId:", chatId);
            return;
          }
  
          const chat = await Chat.findById(chatId);
          if (!chat) return;
  
          const newMessage = { sender: senderId, senderType, text, timestamp: new Date() };
          chat.messages.push(newMessage);
          await chat.save();
  
          // Emit the message to all clients in the room
          io.to(chatId).emit("message received", { chatId, newMessage });
        } catch (error) {
          console.error("Error handling message:", error);
        }
      });
  
      socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
      });
    });
  };