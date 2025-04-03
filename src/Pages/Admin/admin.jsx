"use client"

import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, Building2, MessageSquare, MoreHorizontal, Trash2, Edit, Eye, Search, UserPlus } from "lucide-react"
import Navbar from "@/Component/Navbar"
import { AuthContext } from "@/Component/AuthContext"
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobseekers")

  const { jobseekersdetailsforadmin, feedbackdetails, companydetails } = useContext(AuthContext)
  console.log("the job details are ",jobseekersdetailsforadmin);
  console.log("the company details are ",companydetails)
  const [jobseekers, setJobseekers] = useState([])
  const [feedback, setFeedback] = useState([])
  const [companies, setCompanies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const {deletedetails}=useContext(AuthContext)

   useEffect(() => {
    console.log("Admins from AuthContext:", jobseekersdetailsforadmin);
    setJobseekers(jobseekersdetailsforadmin)
    setFeedback(feedbackdetails)
    setCompanies(companydetails)
}, [jobseekersdetailsforadmin,feedbackdetails,companydetails]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const handleEdit = (item) => {
    setSelectedItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDeletejobseekers = (item) => {
   
   setTimeout(()=>deletedetails("jobseekers",item._id),0)
  }

  const handleDeletecompany=(item)=>{
    
    setTimeout(()=>deletedetails("company",item._id),0)
  }

  const handleDeletefeedback=(item)=>{
    setTimeout(() => deletedetails("feedback", item._id), 0);
  }


  const handleView = (item) => {
    setSelectedItem(item)
    setIsViewDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real application, you would call an API to delete the item
    if (activeTab === "jobseekers") {
      setJobseekers(jobseekers.filter((item) => item.id !== selectedItem.id))
    } else if (activeTab === "feedback") {
      setFeedback(feedback.filter((item) => item.id !== selectedItem.id))
    } else if (activeTab === "companies") {
      setCompanies(companies.filter((item) => item.id !== selectedItem.id))
    }
    setIsDeleteDialogOpen(false)
  }

  const saveChanges = (updatedItem) => {
    // In a real application, you would call an API to update the item
    if (activeTab === "jobseekers") {
      setJobseekers(jobseekers.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    } else if (activeTab === "feedback") {
      setFeedback(feedback.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    } else if (activeTab === "companies") {
      setCompanies(companies.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    }
    setIsEditDialogOpen(false)
  }

//   const filteredJobseekers = jobseekers.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.skills.toLowerCase().includes(searchTerm.toLowerCase()),
//   )
// console.log(filteredJobseekers)
// const filteredFeedback = feedback.filter(
//   (item) =>
//     item.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.message?.toLowerCase().includes(searchTerm.toLowerCase())
// );
// console.log("the filteredfeedback is ",filteredFeedback)

  // const filteredCompanies = companies.filter(
  //   (item) =>
  //     item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  // )
// console.log("the company filtered ",filteredCompanies)
  return (
    <div>
        
         <div className="min-h-screen bg-gray-50">
         <Navbar />
       <div className="flex">
         {/* Sidebar */}
         
         <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-white border-r border-gray-200 mt-20">
           <div className="flex items-center h-16 px-4 border-b border-gray-200 bg-primary">
             <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
           </div>
           <div className="flex flex-col flex-1 overflow-y-auto">
             <nav className="flex-1 px-2 py-4 space-y-1">
               <button
                 className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full ${activeTab === "jobseekers" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
                 onClick={() => setActiveTab("jobseekers")}
               >
                 <Users className="mr-3 h-5 w-5" />
                 Jobseekers
               </button>
 
               <button
                 className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full ${activeTab === "feedback" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
                 onClick={() => setActiveTab("feedback")}
               >
                 <MessageSquare className="mr-3 h-5 w-5" />
                 Feedback
               </button>
 
               <button
                 className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full ${activeTab === "companies" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
                 onClick={() => setActiveTab("companies")}
               >
                 <Building2 className="mr-3 h-5 w-5" />
                 Companies
               </button>
             </nav>
           </div>
         </div>
 
         {/* Main content */}
         <div className="flex flex-col flex-1 md:pl-64">
           {/* Top navigation */}
           <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
             <div className="flex flex-1 justify-between px-4">
               <div className="flex flex-1">
                 <div className="flex w-full md:ml-0">
                   <div className="relative w-full max-w-md">
                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                       <Search className="h-4 w-5 text-gray-400 mb-7"  />
                     </div>
                     <Input
                       type="text"
                       placeholder="Search..."
                       className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                       value={searchTerm}
                       onChange={handleSearch}
                     />
                   </div>
                 </div>
               </div>
               <div className="ml-4 flex items-center md:ml-6">
                 <span className="text-sm font-medium text-gray-700 mr-2">Website Admin</span>
               </div>
             </div>
           </div>
 
           {/* Dashboard content */}
           <main className="flex-1 pb-8">
             <div className="mt-8 px-4 sm:px-6 lg:px-8">
               {/* Dashboard stats */}
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                 <Card>
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">Total Jobseekers</CardTitle>
                     <Users className="h-4 w-4 text-muted-foreground" />
                   </CardHeader>
                   <CardContent>
                     <div className="text-2xl font-bold">{jobseekers.length}</div>
                     <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
                   </CardContent>
                 </Card>
                 <Card>
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                     <Building2 className="h-4 w-4 text-muted-foreground" />
                   </CardHeader>
                   <CardContent>
                     <div className="text-2xl font-bold">{companies.length}</div>
                     <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
                   </CardContent>
                 </Card>
                 <Card>
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">Feedback Received</CardTitle>
                     <MessageSquare className="h-4 w-4 text-muted-foreground" />
                   </CardHeader>
                   <CardContent>
                     <div className="text-2xl font-bold">{feedback.length}</div>
                     <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
                   </CardContent>
                 </Card>
               </div>
 
               {/* Data tables */}
               <div className="mt-8">
                 <div className="sm:flex sm:items-center">
                   <div className="sm:flex-auto">
                     <h1 className="text-xl font-semibold text-gray-900">
                       {activeTab === "jobseekers" && "Jobseekers"}
                       {activeTab === "feedback" && "Feedback"}
                       {activeTab === "companies" && "Companies"}
                     </h1>
                     <p className="mt-2 text-sm text-gray-700">
                       {activeTab === "jobseekers" &&
                         "A list of all jobseekers including their name, email, skills, and status."}
                       {activeTab === "feedback" && "A list of all feedback received from users."}
                       {activeTab === "companies" && "A list of all companies registered on the platform."}
                     </p>
                   </div>
                   <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                     {activeTab === "jobseekers" && (
                       <Button className="flex items-center">
                         <UserPlus className="mr-2 h-4 w-4" />
                         Add Jobseeker
                       </Button>
                     )}
                     {activeTab === "companies" && (
                       <Button className="flex items-center">
                         <Building2 className="mr-2 h-4 w-4" />
                         Add Company
                       </Button>
                     )}
                   </div>
                 </div>
 
                 {/* Jobseekers Table */}
                 {activeTab === "jobseekers" && (
                   <div className="mt-8 flex flex-col">
                     <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                       <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                         <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                           <Table>
                             <TableHeader>
                               <TableRow>
                                 <TableHead>Name</TableHead>
                                 <TableHead>Email</TableHead>
                                 <TableHead>Skills</TableHead>
                                 <TableHead>Education</TableHead>
                                 <TableHead>Jobtype</TableHead>
                                 <TableHead className="text-right">Actions</TableHead>
                               </TableRow>
                             </TableHeader>
                             <TableBody>
                               {jobseekersdetailsforadmin.map((person) => (
                                 <TableRow key={person.id}>
                                   <TableCell className="font-medium">{person.firstName}</TableCell>
                                   <TableCell>{person.email}</TableCell>
                                   <TableCell>{person.skills}</TableCell>
                                   <TableCell>{person. education}</TableCell>
                                <TableCell>{person.Job}</TableCell>
                                   <TableCell className="text-right">
                                     <DropdownMenu>
                                       <DropdownMenuTrigger asChild>
                                         <Button variant="ghost" className="h-8 w-8 p-0">
                                           <span className="sr-only">Open menu</span>
                                           <MoreHorizontal className="h-4 w-4" />
                                         </Button>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent align="end">
                                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                         <DropdownMenuItem onClick={() => handleView(person)}>
                                           <Eye className="mr-2 h-4 w-4" />
                                           View Details
                                         </DropdownMenuItem>
                                         <DropdownMenuItem onClick={() => handleEdit(person)}>
                                           <Edit className="mr-2 h-4 w-4" />
                                           Edit
                                         </DropdownMenuItem>
                                         <DropdownMenuSeparator />
                                         <DropdownMenuItem onClick={() => handleDeletejobseekers(person)} className="text-red-600">
                                           <Trash2 className="mr-2 h-4 w-4" />
                                           Delete
                                         </DropdownMenuItem>
                                       </DropdownMenuContent>
                                     </DropdownMenu>
                                   </TableCell>
                                 </TableRow>
                               ))}
                             </TableBody>
                           </Table>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
 
                 {/* Feedback Table */}
                 {activeTab === "feedback" && (
                   <div className="mt-8 flex flex-col">
                     <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                       <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                         <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                           <Table>
                             <TableHeader>
                               <TableRow>
                                 <TableHead>User</TableHead>
                                 <TableHead>Feedback</TableHead>
                                 <TableHead>FeedbackType</TableHead>
                                 <TableHead>Rating</TableHead>
                                 <TableHead>Date</TableHead>
                                 <TableHead className="text-right">Actions</TableHead>
                               </TableRow>
                             </TableHeader>
                             <TableBody>
                               {feedback.map((item) => (
                                 <TableRow key={item._id}>
                                   <TableCell className="font-medium">{item.firstName}</TableCell>
                                   <TableCell>{item.Messsage}</TableCell>
                                   <TableCell>{item.FeedbackType}</TableCell>
                                   <TableCell>{item.Rating}</TableCell>
                                   <TableCell>{item.createdAt}</TableCell>
                                   <TableCell className="text-right">
                                     <DropdownMenu>
                                       <DropdownMenuTrigger asChild>
                                         <Button variant="ghost" className="h-8 w-8 p-0">
                                           <span className="sr-only">Open menu</span>
                                           <MoreHorizontal className="h-4 w-4" />
                                         </Button>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent align="end">
                                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                         <DropdownMenuItem onClick={() => handleView(item)}>
                                           <Eye className="mr-2 h-4 w-4" />
                                           View Details
                                         </DropdownMenuItem>
                                         <DropdownMenuSeparator />
                                         <DropdownMenuItem onClick={() => handleDeletefeedback(item)} className="text-red-600">
                                           <Trash2 className="mr-2 h-4 w-4" />
                                           Delete
                                         </DropdownMenuItem>
                                       </DropdownMenuContent>
                                     </DropdownMenu>
                                   </TableCell>
                                 </TableRow>
                               ))}
                             </TableBody>
                           </Table>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
 
                 {/* Companies Table */}
                 {activeTab === "companies" && (
                   <div className="mt-8 flex flex-col">
                     <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                       <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                         <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                           <Table>
                             <TableHeader>
                               <TableRow>
                                 <TableHead>Name</TableHead>
                                 <TableHead>Industry</TableHead>
                                 <TableHead>Location</TableHead>
                                 <TableHead>Employees</TableHead>
                                 <TableHead>Status</TableHead>
                                 <TableHead className="text-right">Actions</TableHead>
                               </TableRow>
                             </TableHeader>
                             <TableBody>
                               {companies.map((company) => (
                                 <TableRow key={company.id}>
                                   <TableCell className="font-medium">{company.companyname}</TableCell>
                                   <TableCell>{company.industry}</TableCell>
                                   <TableCell>{company.city}</TableCell>
                                   <TableCell>{company.companysize}</TableCell>
                                   <TableCell className="text-right">
                                     <DropdownMenu>
                                       <DropdownMenuTrigger asChild>
                                         <Button variant="ghost" className="h-8 w-8 p-0">
                                           <span className="sr-only">Open menu</span>
                                           <MoreHorizontal className="h-4 w-4" />
                                         </Button>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent align="end">
                                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                         <DropdownMenuItem onClick={() => handleView(company)}>
                                           <Eye className="mr-2 h-4 w-4" />
                                           View Details
                                         </DropdownMenuItem>
                                         <DropdownMenuItem onClick={() => handleEdit(company)}>
                                           <Edit className="mr-2 h-4 w-4" />
                                           Edit
                                         </DropdownMenuItem>
                                         <DropdownMenuSeparator />
                                         <DropdownMenuItem
                                           onClick={() => handleDeletecompany(company)}
                                           className="text-red-600"
                                         >
                                           <Trash2 className="mr-2 h-4 w-4" />
                                           Delete
                                         </DropdownMenuItem>
                                       </DropdownMenuContent>
                                     </DropdownMenu>
                                   </TableCell>
                                 </TableRow>
                               ))}
                             </TableBody>
                           </Table>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             </div>
           </main>
         </div>
       </div>
 
       {/* View Dialog */}
       <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
         <DialogContent className="sm:max-w-lg">
           <DialogHeader>
             <DialogTitle>View Details</DialogTitle>
             <DialogDescription>Detailed information about the selected item.</DialogDescription>
           </DialogHeader>
           {selectedItem && (
             <div className="grid gap-4 py-4">
               {activeTab === "jobseekers" && (
                 <>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Name:</span>
                     <span className="col-span-3">{selectedItem.name}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Email:</span>
                     <span className="col-span-3">{selectedItem.email}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Phone:</span>
                     <span className="col-span-3">{selectedItem.phone}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Skills:</span>
                     <span className="col-span-3">{selectedItem.skills}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Experience:</span>
                     <span className="col-span-3">{selectedItem.experience}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Education:</span>
                     <span className="col-span-3">{selectedItem.education}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Status:</span>
                     <span className="col-span-3">
                       <span
                         className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                           selectedItem.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                         }`}
                       >
                         {selectedItem.status}
                       </span>
                     </span>
                   </div>
                 </>
               )}
               {activeTab === "feedback" && (
                 <>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">User:</span>
                     <span className="col-span-3">{selectedItem.userName}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Message:</span>
                     <span className="col-span-3">{selectedItem.message}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Rating:</span>
                     <span className="col-span-3">
                       <div className="flex">
                         {[...Array(5)].map((_, i) => (
                           <svg
                             key={i}
                             className={`h-5 w-5 ${i < selectedItem.rating ? "text-yellow-400" : "text-gray-300"}`}
                             fill="currentColor"
                             viewBox="0 0 20 20"
                           >
                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                         ))}
                       </div>
                     </span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Date:</span>
                     <span className="col-span-3">{selectedItem.date}</span>
                   </div>
                 </>
               )}
               {activeTab === "companies" && (
                 <>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Name:</span>
                     <span className="col-span-3">{selectedItem.name}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Email:</span>
                     <span className="col-span-3">{selectedItem.email}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Phone:</span>
                     <span className="col-span-3">{selectedItem.phone}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Industry:</span>
                     <span className="col-span-3">{selectedItem.industry}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Location:</span>
                     <span className="col-span-3">{selectedItem.location}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Employees:</span>
                     <span className="col-span-3">{selectedItem.employees}</span>
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <span className="text-sm font-medium">Status:</span>
                     <span className="col-span-3">
                       <span
                         className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                           selectedItem.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                         }`}
                       >
                         {selectedItem.status}
                       </span>
                     </span>
                   </div>
                 </>
               )}
             </div>
           )}
           <DialogFooter>
             <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
 
       {/* Edit Dialog */}
       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
         <DialogContent className="sm:max-w-lg">
           <DialogHeader>
             <DialogTitle>Edit {activeTab.slice(0, -1)}</DialogTitle>
             <DialogDescription>Make changes to the selected item. Click save when you're done.</DialogDescription>
           </DialogHeader>
           {selectedItem && (
             <div className="grid gap-4 py-4">
               {activeTab === "jobseekers" && (
                 <>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="name" className="text-right text-sm font-medium">
                       Name
                     </label>
                     <Input
                       id="name"
                       defaultValue={selectedItem.name}
                       className="col-span-3"
                       onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                     />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="email" className="text-right text-sm font-medium">
                       Email
                     </label>
                     <Input
                       id="email"
                       defaultValue={selectedItem.email}
                       className="col-span-3"
                       onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
                     />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="skills" className="text-right text-sm font-medium">
                       Skills
                     </label>
                     <Input
                       id="skills"
                       defaultValue={selectedItem.skills}
                       className="col-span-3"
                       onChange={(e) => setSelectedItem({ ...selectedItem, skills: e.target.value })}
                     />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="experience" className="text-right text-sm font-medium">
                       Experience
                     </label>
                     <Input
                       id="experience"
                       defaultValue={selectedItem.experience}
                       className="col-span-3"
                       onChange={(e) => setSelectedItem({ ...selectedItem, experience: e.target.value })}
                     />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="status" className="text-right text-sm font-medium">
                       Status
                     </label>
                     <select
                       id="status"
                       defaultValue={selectedItem.status}
                       className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                       onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                     >
                       <option value="Active">Active</option>
                       <option value="Inactive">Inactive</option>
                     </select>
                   </div>
                 </>
               )}
               {activeTab === "companies" && (
                 <>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="name" className="text-right text-sm font-medium">
                       Name
                     </label>
                     <Input
                       id="name"
                       defaultValue={selectedItem.name}
                       className="col-span-3"
                       onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                     />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="email" className="text-right text-sm font-medium">
                       Email
                     </label>
                     <Input
                       id="email"
                       defaultValue={selectedItem.email}
                       className="col-span-3"
                       onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
                     />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="industry" className="text-right text-sm font-medium">
                       Industry
                     </label>
                     <Input
                       id="industry"
                       defaultValue={selectedItem.industry}
                       className="col-span-3"
                       onChange={(e) => setSelectedItem({ ...selectedItem, industry: e.target.value })}
                     />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="location" className="text-right text-sm font-medium">
                       Location
                     </label>
                     <Input
                       id="location"
                       defaultValue={selectedItem.location}
                       className="col-span-3"
                       onChange={(e) => setSelectedItem({ ...selectedItem, location: e.target.value })}
                     />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <label htmlFor="status" className="text-right text-sm font-medium">
                       Status
                     </label>
                     <select
                       id="status"
                       defaultValue={selectedItem.status}
                       className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                       onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                     >
                       <option value="Active">Active</option>
                       <option value="Inactive">Inactive</option>
                     </select>
                   </div>
                 </>
               )}
             </div>
           )}
           <DialogFooter>
             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
               Cancel
             </Button>
             <Button onClick={() => saveChanges(selectedItem)}>Save changes</Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
 
       {/* Delete Dialog */}
       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
         <DialogContent className="sm:max-w-md">
           <DialogHeader>
             <DialogTitle>Delete {activeTab.slice(0, -1)}</DialogTitle>
             <DialogDescription>
               Are you sure you want to delete this {activeTab.slice(0, -1)}? This action cannot be undone.
             </DialogDescription>
           </DialogHeader>
           <DialogFooter>
             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
               Cancel
             </Button>
             <Button variant="destructive" onClick={confirmDelete}>
               Delete
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
     </div>
    </div>
   
  )
}

// Usage example
export default function AdminPage() {
  return <AdminDashboard />
}

