import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* WebApp Name */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold hover:text-indigo-200">
              Chat App
            </a>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex space-x-8">
            <a
              href="/login"
              className="text-base font-medium hover:bg-indigo-700 px-4 py-3 rounded-lg transition"
            >
              Login
            </a>
            <a
              href="/register"
              className="text-base font-medium hover:bg-indigo-700 px-4 py-3 rounded-lg transition"
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
            >
              <svg
                className={`h-6 w-6 transform ${
                  isMenuOpen ? "rotate-90" : "rotate-0"
                } transition-transform duration-300`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/login"
              className="block text-base font-medium hover:bg-indigo-700 px-4 py-3 rounded-lg transition"
            >
              Login
            </a>
            <a
              href="/register"
              className="block text-base font-medium hover:bg-indigo-700 px-4 py-3 rounded-lg transition"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
