"use client"

import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Briefcase, User } from "lucide-react"
import Navbar from "@/Component/Navbar"

import { AuthContext } from "@/Component/AuthContext"
export default function EmployerRegistration() {
  const {registercompany}=useContext(AuthContext);
  const [companyname ,setCompanyname]=useState("");
  const [industry,setIndustry]=useState("");
  const [companysize,setCompanysize]=useState("");
  const [companywebsite,setCompanywebsite]=useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [companydescription,setCompanyDescription]=useState("");
  const [logo,setLogo]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    registercompany(companyname,companydescription,companysize,companywebsite,firstName,lastName,zipCode,phone,email,logo,industry,password,address,city,state)
  }

  return (
    <div className="container mt-0">
        <Navbar />
      <div className="max-w-3xl mx-auto mt-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Join CareerPool</h1>
          <p className="text-muted-foreground mt-2">Create your employer account and find the perfect candidates</p>
        </div>

        <Tabs defaultValue="employer" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applicant" className="flex items-center gap-2" asChild>
              <Link to="/job_seekers/register">
                <User className="h-4 w-4" />
                <span>Job Seeker</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="employer" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Employer</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Employer Registration</CardTitle>
            <CardDescription>Fill in your company details to create your employer account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Company Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" name="companyName"  onchange={(e)=>setCompanyname(e.target.value) } required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select name="industry" defaultValue="technology" onchange={(e)=>setIndustry(e.target.value) }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size *</Label>
                    <Select name="companySize" defaultValue="11-50" onchange={(e)=>setCompanysize(e.target.value) }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="501-1000">501-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input id="companyWebsite" name="companyWebsite" type="url" placeholder="https://yourcompany.com" onchange={(e)=>setCompanywebsite(e.target.value) } />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description *</Label>
                  <Textarea
                    id="companyDescription"
                    name="companyDescription"
                    onchange={(e)=>setCompanyDescription(e.target.value) }
                    placeholder="Tell potential candidates about your company, culture, and mission"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo</Label>
                  <Input id="logo" name="logo" type="file" onchange={(e)=>setLogo(e.target.value) } />
                  <p className="text-xs text-muted-foreground">Accepted formats: JPG, PNG (Max 2MB)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Person Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" required onchange={(e)=>setFirstName(e.target.value) } />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" required onchange={(e)=>setLastName(e.target.value) } />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required  onchange={(e)=>setEmail(e.target.value) }/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" required  onchange={(e)=>setPhone(e.target.value) } />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input id="password" name="password" type="password" onchange={(e)=>setPassword(e.target.value)}   required />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Company Address</h3>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" name="address"  onchange={(e)=>setAddress(e.target.value) } required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city"  onchange={(e)=>setCity(e.target.value) } required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" name="state"  onchange={(e)=>setState(e.target.value) } required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code *</Label>
                    <Input id="zipCode" name="zipCode"  onchange={(e)=>setZipCode(e.target.value) } required />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold">
                Create an account 
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="text-primary underline underline-offset-4">
                  Sign in
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

