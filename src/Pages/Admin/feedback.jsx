"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, MessageSquare, ThumbsUp, AlertTriangle, Send } from "lucide-react"
import Navbar from "@/Component/Navbar"

import { AuthContext } from "@/Component/AuthContext"
export default function FeedbackPage() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [message, setMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState("suggestion")
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const {feedbackhelper}=useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your server
    feedbackhelper(firstName,rating,feedbackType,email,message )

    // Show success state
    setSubmitted(true)

    // Reset form after submission
    setTimeout(() => {
      setEmail("")
      setFirstName("")
      setMessage("")
      setFeedbackType("suggestion")
      setRating(0)
      setSubmitted(false)
    }, 5000)
  }

  const handleRating = (value) => {
    setRating(value)
  }

  return (
    <div>
        <Navbar
                  navLinks={[
                { label: "Home", href: "/" },
                { label: "Feedback", href: "/feedback" },
                { label: "Career", href: "/Career" },
                { label:  "Aboutus" ,href:"/aboutus"},
              ]}
              showAuthButtons={true} 
              />
<div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
       
       <div className="max-w-4xl mx-auto">
         <div className="text-center mb-12">
           <h1 className="text-3xl font-bold tracking-tight text-indigo-900 sm:text-4xl md:text-5xl">
             We Value Your Feedback
           </h1>
           <p className="mt-4 text-lg text-indigo-600 max-w-2xl mx-auto">
             Your thoughts help us improve. Let us know what you think about our products and services.
           </p>
         </div>
 
         {submitted ? (
           <Card className="w-full max-w-xl mx-auto bg-white shadow-lg border-t-4 border-green-500">
             <CardContent className="pt-6">
               <div className="flex flex-col items-center justify-center py-12 text-center">
                 <div className="bg-green-100 p-3 rounded-full mb-4">
                   <CheckCircle2 className="h-12 w-12 text-green-500" />
                 </div>
                 <h3 className="text-2xl font-medium text-slate-900">Thank You for Your Feedback!</h3>
                 <p className="mt-2 text-slate-600 max-w-md">
                   We appreciate you taking the time to share your thoughts with us. Your feedback is invaluable in
                   helping us improve.
                 </p>
               </div>
             </CardContent>
           </Card>
         ) : (
           <Card className="w-full max-w-xl mx-auto bg-white shadow-lg">
             <CardHeader>
               <CardTitle>Share Your Thoughts</CardTitle>
               <CardDescription>We're committed to constantly improving and your feedback matters.</CardDescription>
             </CardHeader>
             <CardContent>
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="firstName">First Name</Label>
                     <Input
                       id="firstName"
                       placeholder="John"
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                       required
                     />
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                       id="email"
                       type="email"
                       placeholder="john@example.com"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                     />
                   </div>
                 </div>
 
                 <div className="space-y-2">
                   <Label>Feedback Type</Label>
                   <RadioGroup
                     value={feedbackType}
                     onValueChange={setFeedbackType}
                     className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-6"
                   >
                     <div className="flex items-center space-x-2">
                       <RadioGroupItem value="suggestion" id="suggestion" />
                       <Label htmlFor="suggestion" className="flex items-center gap-1">
                         <MessageSquare className="h-4 w-4 text-blue-500" />
                         Suggestion
                       </Label>
                     </div>
                     <div className="flex items-center space-x-2">
                       <RadioGroupItem value="praise" id="praise" />
                       <Label htmlFor="praise" className="flex items-center gap-1">
                         <ThumbsUp className="h-4 w-4 text-green-500" />
                         Praise
                       </Label>
                     </div>
                     <div className="flex items-center space-x-2">
                       <RadioGroupItem value="complaint" id="complaint" />
                       <Label htmlFor="complaint" className="flex items-center gap-1">
                         <AlertTriangle className="h-4 w-4 text-amber-500" />
                         Complaint
                       </Label>
                     </div>
                   </RadioGroup>
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="message">Your Message</Label>
                   <Textarea
                     id="message"
                     placeholder="Please share your detailed feedback here..."
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     className="min-h-[150px]"
                     required
                   />
                 </div>
 
                 <div className="space-y-2">
                   <Label>Rate Your Experience</Label>
                   <div className="flex items-center justify-center space-x-1">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <button
                         key={star}
                         type="button"
                         onClick={() => handleRating(star)}
                         className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                           rating >= star ? "text-yellow-400" : "text-gray-300"
                         }`}
                       >
                         <svg
                           className="w-8 h-8"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                         >
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                         </svg>
                       </button>
                     ))}
                   </div>
                 </div>
 
                 <Button type="submit" className="w-full group">
                   <span className="flex items-center justify-center gap-2">
                     Submit Feedback
                     <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                   </span>
                 </Button>
               </form>
             </CardContent>
             <CardFooter className="flex justify-center border-t pt-6">
               <p className="text-sm text-slate-500 text-center">
                 Your feedback is confidential and will only be used to improve our services.
               </p>
             </CardFooter>
           </Card>
         )}
 
         <div className="mt-16 grid gap-6 md:grid-cols-3">
           <div className="bg-white p-6 rounded-lg shadow-md border-t-2 border-indigo-500">
             <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-full">
               <svg
                 className="w-6 h-6 text-indigo-600"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                 ></path>
               </svg>
             </div>
             <h3 className="font-medium text-lg mb-2 text-center">We Listen</h3>
             <p className="text-slate-600 text-center">Every piece of feedback is reviewed by our dedicated team.</p>
           </div>
           <div className="bg-white p-6 rounded-lg shadow-md border-t-2 border-indigo-500">
             <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-full">
               <svg
                 className="w-6 h-6 text-indigo-600"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                 ></path>
               </svg>
             </div>
             <h3 className="font-medium text-lg mb-2 text-center">We Act</h3>
             <p className="text-slate-600 text-center">Your feedback directly influences our product decisions.</p>
           </div>
           <div className="bg-white p-6 rounded-lg shadow-md border-t-2 border-indigo-500">
             <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-indigo-100 rounded-full">
               <svg
                 className="w-6 h-6 text-indigo-600"
                 fill="none"
                 stroke="currentColor"
                 viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth="2"
                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                 ></path>
               </svg>
             </div>
             <h3 className="font-medium text-lg mb-2 text-center">We Improve</h3>
             <p className="text-slate-600 text-center">Continuous improvement is at the core of everything we do.</p>
           </div>
         </div>
       </div>
     </div>

    </div>
    
  )
}

