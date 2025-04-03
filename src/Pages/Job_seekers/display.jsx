"use client"

import { useContext, useState, useEffect } from "react"
import { Search, Briefcase, MapPin, Filter } from 'lucide-react'
import Navbar from "@/Component/Navbar"
import { AuthContext } from "@/Component/AuthContext"

export default function JobSeekersPage() {
  const { jobs} = useContext(AuthContext)
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [salary, setSalary] = useState("")
  const [jobtitle, setJobtitle] = useState("")
  const [skills, setSkills] = useState("")
  const [jobtype, setJobtype] = useState("")

  // Initialize filteredJobs with all jobs when component mounts
  useEffect(() => {
    setFilteredJobs(jobs)
  }, [jobs])

  const handleSearch = () => {
    setLoading(true)
    
    // Filter jobs based on all criteria
    const results = jobs.filter(job => {
      // Search term filter (checks multiple fields)
      const searchMatch = searchTerm === "" || 
        job.jobtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyid?.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Job type filter
      const jobTypeMatch = jobtype === "" || job.jobtype === jobtype
      
      // Location filter
      const locationMatch = location === "" || job.location === location
      
      // Job title filter
      const jobTitleMatch = jobtitle === "" || job.jobtitle?.includes(jobtitle)
      
      // Skills filter (check if job requires any of the skills entered)
      const skillsMatch = skills === "" || 
        (job.skills && skills.split(',').some(skill => 
          job.skills.toLowerCase().includes(skill.trim().toLowerCase())
        ))
      
      // Salary filter
      let salaryMatch = true
      if (salary !== "") {
        const jobSalary = parseInt(job.salary || "0")
        
        if (salary === "0-50k") {
          salaryMatch = jobSalary <= 50000
        } else if (salary === "50k-100k") {
          salaryMatch = jobSalary > 50000 && jobSalary <= 100000
        } else if (salary === "100k+") {
          salaryMatch = jobSalary > 100000
        }
      }
      
      // All filters must match for the job to be included
      return searchMatch && jobTypeMatch && locationMatch && 
             jobTitleMatch && skillsMatch && salaryMatch
    })
    
    setFilteredJobs(results)
    setLoading(false)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setLocation("")
    setSalary("")
    setJobtitle("")
    setSkills("")
    setJobtype("")
    setFilteredJobs(jobs)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Find Your Dream Job</h1>
          <p className="text-xl mb-8">Search through thousands of job listings and internships</p>

          {/* Search Bar */}
          <div className="relative max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
              placeholder="Search for jobs, companies, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-700 hover:bg-blue-800 rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Section */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>

            {/* Job Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                value={jobtype}
                onChange={(e) => setJobtype(e.target.value)}
                className="block w-full px-3 py-2 border rounded-md"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Location Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full px-3 py-2 border rounded-md"
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Chicago">Chicago</option>
              </select>
            </div>
            
            {/* Job Title Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <select
                value={jobtitle}
                onChange={(e) => setJobtitle(e.target.value)}
                className="block w-full px-3 py-2 border rounded-md focus:outline-none sm:text-sm"
              >
                <option value="">All Job Titles</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Software Engineer">Software Engineer</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., React, Python"
                className="block w-full px-3 py-2 border rounded-md focus:outline-none sm:text-sm"
              />
              <small className="text-gray-500 text-xs">Separate multiple skills with commas</small>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
              <select
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="block w-full px-3 py-2 border rounded-md focus:outline-none sm:text-sm"
              >
                <option value="">All Salaries</option>
                <option value="0-50k">$0 - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k+">$100k+</option>
              </select>
            </div>
            
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              onClick={handleSearch}
            >
              Apply Filters
            </button>
          </div>

          {/* Job Listings Section */}
          <div className="w-full md:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {loading ? "Loading jobs..." : `${filteredJobs.length} Jobs Found`}
              </h2>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-10">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">No jobs found</h3>
                  <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-blue-600">{job.jobtitle}</h3>
                        <span className="text-sm text-gray-500">{job.dateapply}</span>
                      </div>
                      <p className="text-gray-800 font-medium mt-1">{job.companyid}</p>
                      <div className="flex items-center mt-2 text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <p className="mt-3 text-gray-600 text-sm">{job.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          {job.jobtype && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">Jobtype::
                              {job.jobtype}
                            </span>
                          )}
                          {job.department &&(
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">Department::
                            {job.department}
                            </span>
                          ) }
                          {job.salary && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Salary::
                              ${job.salary}
                            </span>
                          )}
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}