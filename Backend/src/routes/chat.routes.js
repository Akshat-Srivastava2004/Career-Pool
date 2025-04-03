
import { Router } from "express";
import { createchat, getchatMessages, getUserChats } from "../controllers/chat_controller.js";

export const chatrouter=Router();

chatrouter.route("/create").post(createchat)
chatrouter.route("/getchats/:userId").get(getUserChats);
chatrouter.route("/messages/:chatId").get(getchatMessages)

