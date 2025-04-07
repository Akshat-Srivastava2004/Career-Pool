"use client"

import { useContext, useEffect, useState } from "react"
import { ChatContext } from "@/Component/ChatContext"
import { AuthContext } from "@/Component/AuthContext"
import { Send, User, Building2 } from "lucide-react"
import Navbar from "@/Component/Navbar"
import "./style.css"

const Chat = () => {
  const { socket, messages, setMessages } = useContext(ChatContext)
  const { companydetails, jobseekersdetailsforadmin } = useContext(AuthContext)
  const [chatId, setChatId] = useState(null)
  const [chatList, setChatList] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  // Get the currently logged-in user
  const companyName = sessionStorage.getItem("companyname")
  const companyId = sessionStorage.getItem("companyid")
  const jobseekerName = sessionStorage.getItem("jobseekername")
  const jobseekerId = sessionStorage.getItem("jobseekerid")

  const isJobSeeker = !!jobseekerId
  const isCompany = !!companyId

  console.log("Logged-in Jobseeker:", jobseekerName, jobseekerId)
  console.log("Logged-in Company:", companyName, companyId)

  useEffect(() => {
    console.log("Updated chatId is:", chatId)
  }, [chatId])

  // Set chat list based on the logged-in user
  useEffect(() => {
    if (isJobSeeker) {
      setChatList(
        companydetails.map((company) => ({
          name: company.companyname,
          id: company._id,
        })),
      )
    } else if (isCompany) {
      setChatList(
        jobseekersdetailsforadmin.map((jobseeker) => ({
          name: jobseeker.firstName,
          id: jobseeker._id,
        })),
      )
    }
  }, [isJobSeeker, isCompany, companydetails, jobseekersdetailsforadmin])

  // Create or fetch existing chat when a chat is selected
  useEffect(() => {
    if (!selectedChat) return

    const createOrFetchChat = async () => {
      try {
        const currentUserType = companyId ? "company" : "jobseeker"
        const requestBody = {
          companyId: companyId || selectedChat.id,
          jobseekerId: jobseekerId || selectedChat.id,
          currentUserType,
        }

        const response = await fetch("https://career-pool.onrender.com/api/v1/chat/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          throw new Error("Failed to create or fetch chat")
        }

        const data = await response.json()
        console.log("Chat created/fetched:", data)
        setChatId(data._id)
        setMessages(data.messages || [])
      } catch (error) {
        console.log("Error creating/fetching chat:", error)
      }
    }

    createOrFetchChat()
  }, [selectedChat])

  // Join chat room when chatId is available
  useEffect(() => {
    if (socket && chatId) {
      socket.emit("join chat", chatId)
      console.log("🚀 Joined chat room:", chatId)
    }
  }, [socket, chatId])

  // Listen for new messages via WebSocket
  useEffect(() => {
    if (!socket) return

    const handleMessageReceived = (receivedMessage) => {
      console.log("Message received from WebSocket:", receivedMessage)

      if (receivedMessage.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage])
      }
    }

    socket.on("message received", handleMessageReceived)

    return () => {
      socket.off("message received", handleMessageReceived)
    }
  }, [socket, chatId])

  // Send a message
  const sendMessage = () => {
    if (!newMessage.trim() || !chatId) return

    const messageData = {
      chatId,
      senderId: isJobSeeker ? jobseekerId : companyId,
      senderType: isJobSeeker ? "Jobseekers" : "Company",
      text: newMessage,
    }

    socket.emit("SendMessage", messageData)
    setMessages((prev) => [...prev, messageData])
    setNewMessage("")
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div>
      <Navbar />
<div className="flex h-[calc(100vh-80px)] bg-gray-50 rounded-lg shadow-lg overflow-hidden">
      
      {/* Chat List Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {isJobSeeker ? <Building2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
            {isJobSeeker ? "Companies" : "Job Seekers"}
          </h3>
        </div>

        <div className="overflow-y-auto flex-1">
          {chatList.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No contacts available</div>
          ) : (
            chatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChat?.id === chat.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    {isJobSeeker ? <Building2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{chat.name}</p>
                    <p className="text-xs text-gray-500">{isJobSeeker ? "Company" : "Job Seeker"}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                {isJobSeeker ? <Building2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{selectedChat.name}</h3>
                <p className="text-xs text-gray-500">{isJobSeeker ? "Company" : "Job Seeker"}</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isMyMessage = msg.senderId === (isJobSeeker ? jobseekerId : companyId)
                return (
                  <div key={index} className={`mb-4 flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-lg ${
                        isMyMessage
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${isMyMessage ? "text-blue-100" : "text-gray-500"}`}>
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || !chatId}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
          <div className="text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium">Select a chat to start messaging</h3>
            <p className="mt-1">Choose a {isJobSeeker ? "company" : "job seeker"} from the list</p>
          </div>
        </div>
      )}
    </div>
    </div>
    
  )
}

export default Chat

