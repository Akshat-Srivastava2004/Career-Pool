"use client";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Briefcase,
  GraduationCap,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { AuthContext } from "@/Component/AuthContext";
import Navbar from "@/Component/Navbar";
export default function PostJobPage() {
  const {postjob} = useContext(AuthContext);



  const [companyname,setCompanyname]=useState("");
  const [companyid,setCompanyid]=useState("")
  const [jobtitle, setJobtitle] = useState("");
  const [positiontype, setPositiontype] = useState("job");
  const [department, setDepartment] = useState("");
  const [numberposition, setNumberposition] = useState("");
  const [location, setLocation] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [salary, setSalary] = useState("");
  const [period, setPeriod] = useState("");
  const [benefits, setBenefits] = useState("");
  const [jobdetails, setJobdetails] = useState("");
  const [responsibilities, setResonsibilities] = useState("");
  const [requirement, setRequirement] = useState("");
  const [skills, setSkills] = useState("");
  const [dateapply, setDateapply] = useState("");
  const [startdate, setStartdate] = useState("");
  useEffect(() => {
    const storedCompanyname = sessionStorage.getItem("companyname");
    const storedCompanyid = sessionStorage.getItem("companyid");
  
    if (storedCompanyname && storedCompanyid) {
      setCompanyname(storedCompanyname);
      setCompanyid(storedCompanyid);
    }
  
    console.log("Session Storage - Company Name:", storedCompanyname);
    console.log("Session Storage - Company ID:", storedCompanyid);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyname) {
      alert("Please log in first to post a job.");
      return;
    }
    postjob(
      jobtitle,
      positiontype,
      department,
      numberposition,
      location,
      jobtype,
      salary,
      period,
      benefits,
      jobdetails,
      responsibilities,
      requirement,
      skills,
      dateapply,
      startdate,
      companyid,
    );
  };

  return (
    <div className="container mt-0">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Post a New Opportunity</h1>
          <p className="text-muted-foreground mt-2">
            Create a new job or internship listing to find the perfect
            candidates
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Opportunity Details</CardTitle>
            <CardDescription>
              Provide detailed information about the position you're offering
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Enter your company name"
                  value={companyname}
                  // onChange={(e) => setCompanyname(e.target.value)}
                  required
                />
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Frontend Developer, Marketing Intern"
                    onChange={(e) => setJobtitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Position Type *</Label>
                  <RadioGroup
                     value={positiontype}
                    className="flex space-x-4"
                    onValueChange={(value) => setPositiontype(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="job" id="job" />
                      <Label htmlFor="job" className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        Job
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="internship" id="internship" />
                      <Label
                        htmlFor="internship"
                        className="flex items-center gap-1"
                      >
                        <GraduationCap className="h-4 w-4" />
                        Internship
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      name="department"
                      placeholder="e.g. Engineering, Marketing"
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="positions">Number of Positions *</Label>
                    <Input
                      id="positions"
                      name="positions"
                      type="number"
                      min="1"
                      defaultValue="1"
                      onChange={(e) => setNumberposition(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Location & Type */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. New York, NY"
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remote" name="remote" />
                  <label
                    htmlFor="remote"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    This position can be performed remotely
                  </label>
                </div>

                <div className="space-y-2">
                  <Label>Job Type *</Label>
                  <RadioGroup
                    defaultValue="fulltime"
                    className="grid grid-cols-2 md:grid-cols-3 gap-2"
                    onValueChange={(value) => setJobtype(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="fulltime"
                        id="fulltime"
                        onChange={(e) => setJobtype(e.target.value)}
                      />
                      <Label
                        htmlFor="fulltime"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-4 w-4" />
                        Full-time
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="parttime" id="parttime" />
                      <Label htmlFor="parttime">Part-time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="contract" id="contract" />
                      <Label htmlFor="contract">Contract</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="temporary" id="temporary" />
                      <Label htmlFor="temporary">Temporary</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="freelance" id="freelance" />
                      <Label htmlFor="freelance">Freelance</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator />

              {/* Compensation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Compensation
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin">Minimum Salary</Label>
                    <Input
                      id="salaryMin"
                      name="salaryMin"
                      type="number"
                      placeholder="e.g. 50000"
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="salaryMax">Maximum Salary</Label>
                    <Input
                      id="salaryMax"
                      name="salaryMax"
                      type="number"
                      placeholder="e.g. 70000"
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="salaryPeriod">Period</Label>
                    <Select
                      name="salaryPeriod"
                      defaultValue="yearly"
                      onValueChange={(value) => setPeriod(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Per Hour</SelectItem>
                        <SelectItem value="monthly">Per Month</SelectItem>
                        <SelectItem value="yearly">Per Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    onChange={(e) => setBenefits(e.target.value)}
                    id="benefits"
                    name="benefits"
                    placeholder="e.g. Health insurance, 401(k), Flexible working hours, etc."
                  />
                </div>
              </div>

              <Separator />

              {/* Job Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Job Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    onChange={(e) => setJobdetails(e.target.value)}
                    id="description"
                    name="description"
                    placeholder="Provide a detailed description of the job..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities *</Label>
                  <Textarea
                    onChange={(e) => setResonsibilities(e.target.value)}
                    id="responsibilities"
                    name="responsibilities"
                    placeholder="List the key responsibilities for this position..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea
                    onChange={(e) => setRequirement(e.target.value)}
                    id="requirements"
                    name="requirements"
                    placeholder="List the qualifications, skills, and experience required..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills *</Label>
                  <Input
                    onChange={(e) => setSkills(e.target.value)}
                    id="skills"
                    name="skills"
                    placeholder="e.g. JavaScript, React, Communication (comma separated)"
                    required
                  />
                </div>
              </div>

              <Separator />

              {/* Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Important Dates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Application Deadline</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <input
                            type="date"
                            className="bg-transparent border-none outline-none cursor-pointer"
                            onChange={(e) => setDateapply(e.target.value)}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <input
                            type="date"
                            className="bg-transparent border-none outline-none cursor-pointer"
                            onChange={(e) => setStartdate(e.target.value)}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Post a job
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
