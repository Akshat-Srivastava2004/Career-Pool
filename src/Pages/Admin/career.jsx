"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"
import Navbar from "@/Component/Navbar"
import { AuthContext } from "@/Component/AuthContext"
export default function CareerPortal() {
  const [email, setEmail] = useState("")
  const [position, setPosition] = useState("")
  const [resume, setResume] = useState(null)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState("")
  const {Careerhelper}=useContext(AuthContext)
  const positions = [
    "Software Engineer",
    "UX Designer",
    "Product Manager",
    "Data Scientist",
    "Marketing Specialist",
    "Customer Success Manager",
  ]

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setResume(file)
      setFileName(file.name)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
   
    Careerhelper( email, position, resume, message )

    // Show success state
    setSubmitted(true)

    // Reset form after submission
    setEmail("")
    setPosition("")
    setResume(null)
    setFileName("")
    setMessage("")

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  return (
    <div>
        <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
       
       <div className="max-w-4xl mx-auto">
         <div className="text-center mb-12">
           <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">Join Our Team</h1>
           <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
             We're looking for talented individuals to help us build amazing products. Check out our open positions and
             apply today.
           </p>
         </div>
 
         {submitted ? (
           <Card className="w-full max-w-xl mx-auto bg-white shadow-lg">
             <CardContent className="pt-6">
               <div className="flex flex-col items-center justify-center py-12 text-center">
                 <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                 <h3 className="text-2xl font-medium text-slate-900">Application Submitted!</h3>
                 <p className="mt-2 text-slate-600">
                   Thank you for your interest in joining our team. We'll review your application and get back to you
                   soon.
                 </p>
               </div>
             </CardContent>
           </Card>
         ) : (
           <Card className="w-full max-w-xl mx-auto bg-white shadow-lg">
             <CardHeader>
               <CardTitle>Apply for a Position</CardTitle>
               <CardDescription>Fill out the form below to submit your application.</CardDescription>
             </CardHeader>
             <CardContent>
               <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                 <div className="space-y-2">
                   <Label htmlFor="email">Email</Label>
                   <Input
                     id="email"
                     type="email"
                     placeholder="your.email@example.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                   />
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="position">Position</Label>
                   <Select value={position} onValueChange={setPosition} required>
                     <SelectTrigger id="position">
                       <SelectValue placeholder="Select a position" />
                     </SelectTrigger>
                     <SelectContent>
                       {positions.map((pos) => (
                         <SelectItem key={pos} value={pos}>
                           {pos}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="resume">Resume</Label>
                   <div className="flex items-center gap-2">
                     <Button
                       type="button"
                       variant="outline"
                       onClick={() => document.getElementById("resume-upload").click()}
                       className="w-full justify-start text-slate-500"
                     >
                       {fileName || "Upload your resume"}
                     </Button>
                     <Input
                       id="resume-upload"
                       type="file"
                       accept=".pdf,.doc,.docx"
                       className="hidden"
                       onChange={handleResumeChange}
                       required
                     />
                   </div>
                   <p className="text-xs text-slate-500">Accepted formats: PDF, DOC, DOCX</p>
                 </div>
 
                 <div className="space-y-2">
                   <Label htmlFor="message">Additional Information</Label>
                   <Textarea
                     id="message"
                     placeholder="Tell us why you're interested in this position and what makes you a great fit."
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     className="min-h-[120px]"
                   />
                 </div>
 
                 <Button type="submit" className="w-full">
                   Submit Application
                 </Button>
               </form>
             </CardContent>
             <CardFooter className="flex justify-center border-t pt-6">
               <p className="text-sm text-slate-500">
                 By submitting this application, you agree to our privacy policy and terms of service.
               </p>
             </CardFooter>
           </Card>
         )}
 
         <div className="mt-16 grid gap-8 md:grid-cols-3">
           <div className="bg-white p-6 rounded-lg shadow-md">
             <h3 className="font-medium text-lg mb-2">Competitive Salary</h3>
             <p className="text-slate-600">We offer competitive compensation packages to attract the best talent.</p>
           </div>
           <div className="bg-white p-6 rounded-lg shadow-md">
             <h3 className="font-medium text-lg mb-2">Remote Work</h3>
             <p className="text-slate-600">Enjoy the flexibility of working remotely or from our modern offices.</p>
           </div>
           <div className="bg-white p-6 rounded-lg shadow-md">
             <h3 className="font-medium text-lg mb-2">Growth Opportunities</h3>
             <p className="text-slate-600">We invest in our employees' professional development and career growth.</p>
           </div>
         </div>
       </div>
     </div>
    </div>
    
  )
}

