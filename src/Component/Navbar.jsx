import { useState } from "react";
import { Briefcase, Menu, X } from "lucide-react";

export default function Navbar({
  navLinks = [],
  showAuthButtons = true,
  authButtons = null,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo & Branding */}
        <div className="flex items-center">
          <Briefcase className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">CareerPool</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map(({ label, href }, index) => (
            <a key={index} href={href} className="text-gray-700 hover:text-indigo-600">
              {label}
            </a>
          ))}
        </nav>

        {/* Auth Buttons (Desktop) */}
        {showAuthButtons && (
          <div className="hidden md:flex space-x-4">
            {authButtons ? (
              authButtons
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Sidebar (Right Side) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-white w-64 h-full shadow-lg p-4 absolute right-0 top-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className="mb-4 text-gray-900" onClick={() => setIsOpen(false)}>
            <X className="h-8 w-8" />
          </button>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col space-y-4">
            {navLinks.map(({ label, href }, index) => (
              <a key={index} href={href} className="text-gray-700 hover:text-indigo-600">
                {label}
              </a>
            ))}
          </nav>

          {/* Auth Buttons (Mobile) */}
          {showAuthButtons && (
            <div className="mt-6 flex flex-col space-y-4">
              {authButtons ? (
                authButtons
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
                  >
                    Log In
                  </a>
                  <a
                    href="/signup"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
