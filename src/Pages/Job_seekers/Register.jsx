"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/Component/Navbar";
import { AuthContext } from "@/Component/AuthContext";
export default function ApplicantRegistration() {
  const { register } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null); // File input should be null initially
  const [job, setJob] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    register(
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      city,
      state,
      zipCode,
      education,
      skills,
      resume,
      job
    );
  };

  return (
    <div className="container  mt-0">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mt">Join CareerPool</h1>
          <p className="text-muted-foreground mt-2">
            Create your job seeker account and find your dream job
          </p>
        </div>

        <Tabs defaultValue="applicant" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applicant" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Job Seeker</span>
            </TabsTrigger>
            <TabsTrigger
              value="employer"
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/company/register">
                <Briefcase className="h-4 w-4" />
                <span>Employer</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Job Seeker Registration</CardTitle>
            <CardDescription>
              Fill in your details to create your job seeker account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Professional Information
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="education">Highest Education *</Label>
                  <Select
                    name="education"
                    value={education}
                    onValueChange={(value) => setEducation(value)} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="highschool">High School</SelectItem>
                      <SelectItem value="associates">
                        Associate's Degree
                      </SelectItem>
                      <SelectItem value="bachelors">
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills *</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Enter your skills separated by commas (e.g., JavaScript, React, Project Management)"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobPreference">Job Preference</Label>
                  <Select
                    name="jobPreference"
                    defaultValue="fulltime"
                    onValueChange={(value) => setJob(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Upload Resume</Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                  <p className="text-xs text-muted-foreground">
                    Accepted formats: PDF, DOCX (Max 5MB)
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold "
              >
                Create an Account
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary underline underline-offset-4"
                >
                  Sign in
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
