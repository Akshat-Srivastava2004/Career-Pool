"use client"

import { useContext, useState } from "react"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, User, Loader2 } from "lucide-react"
import { AuthContext } from "@/Component/AuthContext"
import Navbar from "@/Component/Navbar"
export default function LoginPage() {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const {login}=useContext(AuthContext);
const {logincompany}=useContext(AuthContext);

const [error, setError] = useState({

    jobSeeker: "",
    employer: "",
  })
console.log(setError);

const handleSubmitjobseekers = async(e)=>{
    e.preventDefault();
    login(email,password)
}

const handleSubmitcompany=async(e)=>{
    e.preventDefault();
    logincompany(email,password)
}


  return (
    <div>
       <Navbar
           navLinks={[
         { label: "Home", href: "/" },
         { label: "Feedback", href: "/feedback" },
         { label: "Career", href: "/Career" },
         { label:  "Aboutus" ,href:"/aboutus"},
        {label: "Register",href:"/company/register"},
       ]}
       showAuthButtons={false} 
       />
 <div className="container flex items-center justify-center min-h-screen py-10 px-4">
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to CareerPool</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <Tabs defaultValue="jobSeeker" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="jobSeeker" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <a href="/jobseekersregister">
              <span>Job Seeker</span>
              </a>
            
            </TabsTrigger>
            <TabsTrigger value="employer" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Employer</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobSeeker">
            <Card>
              <CardHeader>
                <CardTitle>Job Seeker Login</CardTitle>
                <CardDescription>Enter your credentials to access your job seeker account</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitjobseekers }>
                <CardContent className="space-y-4">
                  {error.jobSeeker && (
                    <div className="p-3 text-sm bg-red-50 text-red-500 rounded-md">{error.jobSeeker}</div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="name@example.com"  onChange={(e)=>setEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" name="password" type="password" onChange={(e)=>setPassword(e.target.value)}required />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" >
                    Submit 
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/register/applicant" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="employer">
            <Card>
              <CardHeader>
                <CardTitle>Employer Login</CardTitle>
                <CardDescription>Enter your credentials to access your employer account</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitcompany}>
                <CardContent className="space-y-4">
                  {error.employer && (
                    <div className="p-3 text-sm bg-red-50 text-red-500 rounded-md">{error.employer}</div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="employer-email">Email</Label>
                    <Input id="employer-email" name="email" type="email" placeholder="name@company.com"  onChange={(e)=>setEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="employer-password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="employer-password" name="password" type="password"   onChange={(e)=>setPassword(e.target.value)}  required />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="employer-remember" />
                    <label
                      htmlFor="employer-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" >
                    Submit
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/register/employer" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </div>
   
  )
}

