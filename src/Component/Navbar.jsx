import { Briefcase } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Briefcase className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">
            CareerPool
          </span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </a>
          <a to="/jobs" className="text-gray-700 hover:text-indigo-600">
            Find Jobs
          </a>
          <a href="/postjob" className="text-gray-700 hover:text-indigo-600">
            For Employers
          </a>
          <a to="/about" className="text-gray-700 hover:text-indigo-600">
            About Us
          </a>
        </nav>
        <div className="flex space-x-4">
          <a
            to="/login"
            className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Log In
          </a>
          <a
            to="/signup"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}
