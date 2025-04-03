import { useContext, useEffect, useState } from "react";
import { ChatContext } from "@/Component/ChatContext";
import { AuthContext } from "@/Component/AuthContext";
import "./style.css";

const Chat = () => {
  const { socket, messages, setMessages } = useContext(ChatContext);
  const { companydetails, jobseekersdetailsforadmin } = useContext(AuthContext);
  const [chatId, setChatId] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Get the currently logged-in user
  const companyName = sessionStorage.getItem("companyname");
  const companyId = sessionStorage.getItem("companyid");
  const jobseekerName = sessionStorage.getItem("jobseekername");
  const jobseekerId = sessionStorage.getItem("jobseekerid");

  const isJobSeeker = !!jobseekerId;
  const isCompany = !!companyId;

  console.log("Logged-in Jobseeker:", jobseekerName, jobseekerId);
  console.log("Logged-in Company:", companyName, companyId);

  useEffect(() => {
    console.log("Updated chatId is:", chatId);
  }, [chatId]);

  // Set chat list based on the logged-in user
  useEffect(() => {
    if (isJobSeeker) {
      setChatList(companydetails.map((company) => ({ 
        name: company.companyname, 
        id: company._id 
      })));
    } else if (isCompany) {
      setChatList(jobseekersdetailsforadmin.map((jobseeker) => ({ 
        name: jobseeker.firstName, 
        id: jobseeker._id 
      })));
    }
  }, [isJobSeeker, isCompany, companydetails, jobseekersdetailsforadmin]);

  // Create or fetch existing chat when a chat is selected
  useEffect(() => {
    if (!selectedChat) return;

    const createOrFetchChat = async () => {
      try {
        let currentUserType = companyId ? "company" : "jobseeker";
        let requestBody = {
          companyId: companyId || selectedChat.id,
          jobseekerId: jobseekerId || selectedChat.id,
          currentUserType,
        };

        const response = await fetch("http://localhost:5000/api/v1/chat/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to create or fetch chat");
        }

        const data = await response.json();
        console.log("Chat created/fetched:", data);
        setChatId(data._id);
        setMessages(data.messages || []);
      } catch (error) {
        console.log("Error creating/fetching chat:", error);
      }
    };

    createOrFetchChat();
  }, [selectedChat]);

  // Join chat room when chatId is available
  useEffect(() => {
    if (socket && chatId) {
      socket.emit("join chat", chatId);
      console.log("🚀 Joined chat room:", chatId);
    }
  }, [socket, chatId]);

  // Listen for new messages via WebSocket
  useEffect(() => {
    if (!socket) return;

    const handleMessageReceived = (receivedMessage) => {
      console.log("Message received from WebSocket:", receivedMessage);

      if (receivedMessage.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    socket.on("message received", handleMessageReceived);

    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [socket, chatId]);

  // Send a message
  const sendMessage = () => {
    if (!newMessage.trim() || !chatId) return;

    const messageData = {
      chatId,
      senderId: isJobSeeker ? jobseekerId : companyId,
      senderType: isJobSeeker ? "Jobseekers" : "Company",
      text: newMessage,
    };

    socket.emit("SendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h3>{isJobSeeker ? "Companies" : "Job Seekers"}</h3>
        {chatList.map((chat) => (
          <div key={chat.id} onClick={() => setSelectedChat(chat)}>
            {chat.name}
          </div>
        ))}
      </div>

      {selectedChat && (
        <div className="chat-box">
          <h3>Chat with {selectedChat.name}</h3>
          <div className="messages">
            {messages.map((msg, index) => (
              <p key={index} className={msg.senderId === (isJobSeeker ? jobseekerId : companyId) ? "my-message" : "other-message"}>
                {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
