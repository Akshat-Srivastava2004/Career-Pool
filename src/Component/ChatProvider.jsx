import { ChatContext } from "./ChatContext";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // ✅ Connect to the backend WebSocket server
    const newSocket = io("https://careerpool-frontend.netlify.app", {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5, // Reconnect up to 5 times if disconnected
      timeout: 10000, // 10 seconds timeout
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket with ID:", newSocket.id);
    });

    // ✅ Listen for incoming messages from the backend
    newSocket.on("message received", ({ chatId, newMessage }) => {
      console.log("📩 Message received from WebSocket:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      console.log("Message received for chat ID:", chatId);
    });

    // Cleanup on unmount
    return () => {
      newSocket.off("message received");
      newSocket.close();
    };
  }, []);
  return (
    <ChatContext.Provider value={{ socket, messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
