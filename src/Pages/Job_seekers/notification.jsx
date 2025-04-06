"use client"

import { useState } from "react"
import { Bell, Briefcase, Calendar, CheckCircle, Clock, Filter, Search } from "lucide-react"
import Navbar from "@/Component/Navbar"
export default function JobseekerNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Frontend Developer",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2 hours ago",
      status: "Application Received",
      isNew: true,
      message: "Your application for Frontend Developer has been received. We'll review it shortly.",
    },
    {
      id: 2,
      company: "Digital Solutions",
      position: "UX Designer",
      logo: "/placeholder.svg?height=40&width=40",
      date: "1 day ago",
      status: "Under Review",
      isNew: true,
      message: "Your application is currently being reviewed by our hiring team.",
    },
    {
      id: 3,
      company: "Global Systems",
      position: "Product Manager",
      logo: "/placeholder.svg?height=40&width=40",
      date: "3 days ago",
      status: "Interview Scheduled",
      isNew: false,
      message: "Congratulations! We'd like to invite you for an interview. Please check your email for details.",
    },
    {
      id: 4,
      company: "Innovative Labs",
      position: "Backend Developer",
      logo: "/placeholder.svg?height=40&width=40",
      date: "1 week ago",
      status: "Application Rejected",
      isNew: false,
      message: "Thank you for your interest. We've decided to proceed with other candidates at this time.",
    },
    {
      id: 5,
      company: "Future Tech",
      position: "Data Scientist",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2 weeks ago",
      status: "Offer Extended",
      isNew: false,
      message:
        "Congratulations! We're pleased to offer you the position. Please check your email for the offer letter.",
    },
  ])

  const [filter, setFilter] = useState("all")

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notification) => (filter === "new" ? notification.isNew : !notification.isNew))

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isNew: false,
      })),
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Application Received":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "Under Review":
        return <Search className="h-5 w-5 text-yellow-500" />
      case "Interview Scheduled":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "Application Rejected":
        return <Briefcase className="h-5 w-5 text-gray-500" />
      case "Offer Extended":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Application Received":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Interview Scheduled":
        return "bg-purple-100 text-purple-800"
      case "Application Rejected":
        return "bg-gray-100 text-gray-800"
      case "Offer Extended":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
        <Navbar />
       <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Application Notifications</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select className="border rounded-md px-2 py-1" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Notifications</option>
                <option value="new">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
            <button onClick={markAllAsRead} className="text-sm text-gray-600 hover:text-gray-900">
              Mark all as read
            </button>
          </div>
        </div>
  
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${notification.isNew ? "bg-gray-50" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={notification.logo || "/placeholder.svg"}
                        alt={notification.company}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.company}
                          {notification.isNew && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </p>
                        <span className="text-sm text-gray-500">{notification.date}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Position: {notification.position}</p>
                      <div className="mt-2 flex items-center">
                        {getStatusIcon(notification.status)}
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}
                        >
                          {notification.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">You don't have any notifications matching your current filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    
  )
}

