import { useState } from "react";

import {
  Search,
  Briefcase,
  Users,
  Building,
  GraduationCap,
  ChevronRight,
  Star,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Landingpage() {
  const [activeTab, setActiveTab] = useState("all");
  console.log("print the active tabs",setActiveTab)

  const jobs = [
    {
      id: 1,
      title: "Frontend Deeveloper",
      company: "Emerson Pvt Ltd",
      location: "Gurgaon",
      type: "Full-Time",
      salary: "Rs 100000",
      posted: "2days ago",
      category: "job",
      featured: true,
      logo: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      title: "Backend Deeveloper",
      company: "Realvibe Pvt Ltd",
      location: "Gurgaon",
      type: "Full-Time",
      salary: "Rs 100000",
      posted: "2days ago",
      category: "job",
      featured: true,
      logo: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      title: "Frontend Deeveloper",
      company: "Emerson Pvt Ltd",
      location: "Gurgaon",
      type: "Internship",
      salary: "Rs 100000",
      posted: "2days ago",
      category: "job",
      featured: true,
      logo: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      title: "Frontend Deeveloper",
      company: "Emerson Pvt Ltd",
      location: "Gurgaon",
      type: "Full-Time",
      salary: "Rs 100000",
      posted: "2days ago",
      category: "job",
      featured: true,
      logo: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 5,
      title: "Frontend Deeveloper",
      company: "Emerson Pvt Ltd",
      location: "Gurgaon",
      type: "Internship",
      salary: "Rs 100000",
      posted: "2days ago",
      category: "Internship",
      featured: true,
      logo: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 6,
      title: "Frontend Deeveloper",
      company: "Emerson Pvt Ltd",
      location: "Gurgaon",
      type: "Internship",
      salary: "Rs 100000",
      posted: "2days ago",
      category: "Internship",
      featured: true,
      logo: "/placeholder.svg?height=50&width=50",
    },
  ];

  // to filter the job bases on  the active tab

  const filteredJobs =
    activeTab === "all"
      ? jobs
      : jobs.filter((job) => job.category === activeTab);

      console.log("printing the filtered jobs usetstate ",filteredJobs)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* headers/navbar is starting from here  */}

      <header className="bg-whites shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">
              CareerPool
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              Find Jobs
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              For Employers
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              About Us
            </a>
          </nav>
          <div className="flex space-x-4">
            <Link to="/login">
            <button className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
              Log In
            </button>
            </Link>
          
            <Link to="/job_seekers/register" >
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Sign Up
            </button>
            </Link>
       
          </div>
        </div>
      </header>

      {/*  Welcome to hero section kingdom */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Job or Internship
            </h1>
            <p className="text-xl mb-8">
              Connect with thousand of companies offering jobs and Internship
              across various industries
            </p>
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row">
              <div className="flex-grow mb-2 md:mb-0 md:mr-2">
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md">
                  <Search className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="job title ,keywords or company "
                    className="bg-transparent border-none w-full focus:outline-none ml-2 text-gray-800"
                  />
                </div>
              </div>

              <div className="flex-grow mb-2 md:mb-0 md:mr-2">
                <div className="flex items center bg-gray-100 px-4 py-2 rounded-md">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="location"
                    className="bg-transparent borded-none w-full focus:outline-none ml-2 text-gray-800"
                  />
                </div>
              </div>

              <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

    {/* welcome to the stats bhut ho gayi adverstisment  */}
    <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 grap-8">
                <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">10,000+</div>
                    <p className="text-gray-600">Active Job Listings</p>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">5000+</div>
                    <p className="text-gray-600">Companies</p>
                </div>
                
                <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">1M+</div>
                    <p className="text-gray-600">Job Seekers</p>
                </div>
                </div>
        </div>
    </section>


    {/* Job listings Sections */}

    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Opportunities
        </h2>

        {/*NOW Tabs */}

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
            <button
             onClick={()=>setActiveTab("all")}
             className={`px-4 py-2 rounded-md ${activeTab==="all"?"bg-indigo-600 text-white":"text-gray-700"}`}>All
             </button>
             <button 
             onClick={()=>setActiveTab("job")}
             className={`px-4 py-2 rounded-md ${activeTab==="job"?"bg-indigo-600 text-white":"text-gray-700"}`}>
              Jobs
              </button>
              <button
              onClick={()=>setActiveTab("Internship")}
              className={`px-4 py-2 rounded-md ${activeTab==="internship"?"bg-indigo-600  text-white":"text-gray-700"}`}
              >Internships
              </button>
          </div>
        </div>
        {/* job cards  */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredJobs.map((job)=>
           <div 
           key={job.id}
           className={`bg-white rounded-lg shadow-md overflow-hidden ${
            job.featured?"ring-2 ring-indigo-600":""
           }`}
           >
          {job.featured && (
            <div className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 text-center">Featured </div>
          )}
          <div className="p-6">
            <div className="flex items-start">
              <img 
              src={job.logo || "/placeholder.svg"}
              alt={`${job.company}logo`}
              className="w-12 h-12 rounded-md mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex-items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location}</span>
              </div>
          
              <div className="flex-items-center text-gray-500">
               <Briefcase className="h-4 w-4 mr-2" />
                <span>{job.type}</span>
              </div>
          
              <div className="flex-items-center text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>{job.posted}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text indigo-600 font-medium">{job.salary}</span>
              <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200">
                Apply Now
              </button>
            </div>
            </div>
            </div>
        )}
        
         </div>
         <div className="mt-10 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            View All Opportunities
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
         </div>
      </div>
    </section>
    {/* For Job Seekers section  */}
     <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
          <h2 className="text-3xl font-bold mb-6">For Job Seekers</h2>
          <p className="text-gray-600 mb-6">
            CareerPool helps you find the perfect job or internship that matches your skills and career goals.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-full mr-4">
                <Search className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
              <h3 className="font-semibold text-gray-900">Discover Opportunities</h3>
              <p className="text-gray-600">Browse thousands of jobs and internships across various industries</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-full mr-4">
                <Star className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Build Your Profile</h3>
                <p className="text-gray-600">Create a standout profile to showcase your skills and experience</p>
              </div>
            </li>

            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-full mr-4">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Apply with Ease</h3>
                <p className="text-gray-600">One-Click applications to streamline your job search process</p>
              </div>
            </li>
          </ul>

          <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Create Your profile
          </button>
          </div>

          <div className="md:w-1/2">
          <img 
          src="https://th.bing.com/th/id/OIP.sf2rXS7BXMfCHJfaZepgOwHaEM?rs=1&pid=ImgDetMain"
          alt="Job seekers using CareerPool"
          className="rounded-lg shadow-lg"
          />
          </div>
        </div>
      </div>
     </section>
    
     {/* For Employers Section */}
     <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 order-2 md:order-1">
              <img
                src="https://th.bing.com/th/id/OIP.Op_hXdJ3tcFV503BAmwJ9QHaE7?w=740&h=493&rs=1&pid=ImgDetMain"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12 order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">For Employers</h2>
              <p className="text-gray-600 mb-6">
                Find the right talent for your company with our comprehensive recruitment solutions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Access Top Talent</h3>
                    <p className="text-gray-600">Connect with qualified candidates who match your requirements</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Building className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Build Your Brand</h3>
                    <p className="text-gray-600">Showcase your company culture and attract the right candidates</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <Briefcase className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Streamlined Hiring</h3>
                    <p className="text-gray-600">Efficient tools to manage applications and screen candidates</p>
                  </div>
                </li>
              </ul>
              <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </section>


        {/* Testimonials Section */}
        <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg?height=50&width=50" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-gray-600 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "CareerPool helped me find my dream job at a tech startup. The platform is intuitive and made my job
                search so much easier!"
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg?height=50&width=50" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">Michael Chen</h3>
                  <p className="text-gray-600 text-sm">Marketing Intern</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I found an amazing internship opportunity through CareerPool that kickstarted my career in marketing.
                Highly recommend!"
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg?height=50&width=50" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold">Emily Rodriguez</h3>
                  <p className="text-gray-600 text-sm">HR Manager</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a recruiter, CareerPool has been invaluable for finding qualified candidates quickly. The quality of
                applicants is consistently high."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step in Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers and employers on CareerPool today and discover new opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-indigo-700 rounded-md hover:bg-gray-100 font-medium">
              Find Jobs
            </button>
            <button className="px-8 py-3 bg-indigo-600 text-white border border-white rounded-md hover:bg-indigo-800 font-medium">
              For Employers
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">CareerPool</span>
              </div>
              <p className="text-gray-400">Connecting talent with opportunities across the globe.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Browse Internships
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Career Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Salary Calculator
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Post a Job
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Recruitment Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Employer Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CareerPool. All rights reserved.</p>
          </div>
        </div>
      </footer>
</div>
)
}
