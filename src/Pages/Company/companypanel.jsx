"use client"

import { useContext, useEffect, useState } from "react"
import { Download, Search, Users, Calendar, Briefcase, DollarSign, MapPin } from "lucide-react"
import Navbar from "@/Component/Navbar"
import { AuthContext } from "@/Component/AuthContext"

export default function CompanyAdminPanel() {
  const { companyadmindetails, companyadminpanel } = useContext(AuthContext)
  console.log("the companyadmindetails for ",companyadmindetails)
  const [applications, setApplications] = useState([])
  const companyName = sessionStorage.getItem("companyname")
  const userId = sessionStorage.getItem("companyid")
  console.log("the login user id is ",userId)
  useEffect(() => {
    companyadminpanel(userId)
    if (companyadmindetails.data && companyadmindetails.data.length >= 0) {
      setApplications(companyadmindetails.data)
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("table") // table or detail
  const [selectedJob, setSelectedJob] = useState(null)

  // Filter applications based on search term
  const filteredApplications = applications.filter(
    (app) =>
      app.jobtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.skills?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate statistics
  const totalJobs = applications.length
  const totalApplicants = applications.reduce((sum, app) => sum + (app.Apply?.length || 0), 0)
  const activeJobs = applications.filter((app) => {
    const endDate = new Date(app.Enddate || app.enddate)
    return endDate > new Date()
  }).length

  const handleViewDetails = (job) => {
    setSelectedJob(job)
    setViewMode("detail")
  }

  const handleBackToList = () => {
    setViewMode("table")
    setSelectedJob(null)
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Company Admin Dashboard</h1>
          <h2 className="text-lg font-medium text-gray-600">{companyName}</h2>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Job Postings</p>
                <p className="text-2xl font-bold">{totalJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-2xl font-bold">{totalApplicants}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Job Listings</p>
                <p className="text-2xl font-bold">{activeJobs}</p>
              </div>
            </div>
          </div>
        </div>

        {viewMode === "table" ? (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search by job title, location, or skills"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Job Listings Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Department
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Salary
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Applicants
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        End Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((job) => {
                      const isActive = new Date(job.Enddate || job.enddate) > new Date()
                      return (
                        <tr key={job._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{job.jobtitle}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{job.department}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{job.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{job.jobtype}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              ${job.salary}/{job.period}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {job.Apply?.length || 0} applicants
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {job.Enddate || job.enddate}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              onClick={() => handleViewDetails(job)}
                            >
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {filteredApplications.length === 0 && (
                <div className="p-8 text-center">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No job postings found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          // Job Details View
          selectedJob && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <button onClick={handleBackToList} className="mb-4 flex items-center text-blue-600 hover:text-blue-800">
                ← Back to job listings
              </button>

              <div className="border-b pb-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedJob.jobtitle}</h2>
                    <p className="text-lg text-gray-600">{selectedJob.department}</p>
                  </div>
                  <span
                    className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      new Date(selectedJob.Enddate || selectedJob.enddate) > new Date()
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {new Date(selectedJob.Enddate || selectedJob.enddate) > new Date() ? "Active" : "Closed"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Job Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{selectedJob.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Job Type</p>
                        <p className="text-gray-600">
                          {selectedJob.jobtype} • {selectedJob.positiontype}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Salary</p>
                        <p className="text-gray-600">
                          ${selectedJob.salary}/{selectedJob.period}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Positions</p>
                        <p className="text-gray-600">{selectedJob.Numberpostion}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Application Period</p>
                        <p className="text-gray-600">
                          {selectedJob.startdate} to {selectedJob.Enddate || selectedJob.enddate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Application Statistics</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{selectedJob.Apply?.length || 0}</div>
                    <p className="text-gray-600">Total Applicants</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedJob.jobdetails}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedJob.Responsibility}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedJob.Requirement}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.split(",").map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedJob.benefits}</p>
                </div>
              </div>

              {/* Applicants Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Applicants</h3>
                {selectedJob.Apply && selectedJob.Apply.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Applicant ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedJob.Apply.map((applicantId) => (
                          <tr key={applicantId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{applicantId}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">View Profile</button>
                              <button className="text-green-600 hover:text-green-900 mr-3">Accept</button>
                              <button className="text-red-600 hover:text-red-900">Reject</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No applicants yet</h3>
                    <p className="mt-1 text-sm text-gray-500">There are no applicants for this position yet.</p>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

