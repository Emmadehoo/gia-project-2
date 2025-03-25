"use client";
import React from "react";

function MainComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: user } = useUser();

  const programs = [
    {
      title: "Agricultural Science",
      description:
        "Study crop production, soil science, and modern farming techniques",
      duration: "2 years",
      icon: "fa-seedling",
    },
    {
      title: "Animal Husbandry",
      description: "Learn about livestock management and veterinary care",
      duration: "2 years",
      icon: "fa-cow",
    },
    {
      title: "Agricultural Engineering",
      description: "Focus on farm machinery and irrigation systems",
      duration: "2 years",
      icon: "fa-tractor",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#357AFF]">GIA</span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="/apply" className="text-gray-700 hover:text-[#357AFF]">
                Apply Now
              </a>
              <a
                href="/account/signin"
                className="text-gray-700 hover:text-[#357AFF]"
              >
                Student Portal
              </a>
              <a href="/admin" className="text-gray-700 hover:text-[#357AFF]">
                Admin
              </a>
              {user ? (
                <a
                  href="/account/logout"
                  className="bg-[#357AFF] text-white px-4 py-2 rounded-lg hover:bg-[#2E69DE]"
                >
                  Sign Out
                </a>
              ) : (
                <a
                  href="/account/signin"
                  className="bg-[#357AFF] text-white px-4 py-2 rounded-lg hover:bg-[#2E69DE]"
                >
                  Sign In
                </a>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2"
            >
              <i
                className={`fas ${
                  menuOpen ? "fa-times" : "fa-bars"
                } text-gray-700`}
              ></i>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/apply"
                className="block px-3 py-2 text-gray-700 hover:text-[#357AFF]"
              >
                Apply Now
              </a>
              <a
                href="/account/signin"
                className="block px-3 py-2 text-gray-700 hover:text-[#357AFF]"
              >
                Student Portal
              </a>
              <a
                href="/admin"
                className="block px-3 py-2 text-gray-700 hover:text-[#357AFF]"
              >
                Admin
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to Gulu Institute of Agriculture
            </h1>
            <p className="text-xl text-gray-600 mb-8">Learning For Reality</p>
            <a
              href="/apply"
              className="inline-block bg-[#357AFF] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#2E69DE] transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Our Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <i
                className={`fas ${program.icon} text-4xl text-[#357AFF] mb-4`}
              ></i>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {program.title}
              </h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              <p className="text-sm text-gray-500">
                Duration: {program.duration}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
              <p className="text-gray-600 mb-2">
                <i className="fas fa-map-marker-alt mr-2 text-[#357AFF]"></i>
                Koro Rom Along Labora Rd
              </p>
              <p className="text-gray-600 mb-2">
                <i className="fas fa-location-dot mr-2 text-[#357AFF]"></i>
                Gulu, Uganda
              </p>
              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600 mb-2">
                <i className="fas fa-phone mr-2 text-[#357AFF]"></i>
                +256 772 965 979
                <i className="fas fa-phone mr-2 text-[#357AFF]"></i>
                +256 771 320 920
              </p>
              <p className="text-gray-600">
                <i className="fas fa-envelope mr-2 text-[#357AFF]"></i>
                admissions@guluagri.edu
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Office Hours
              </h3>
              <p className="text-gray-600 mb-2">
                Monday - Friday: 8:00 AM - 5:00 PM
              </p>
              <p className="text-gray-600 mb-2">Saturday: 9:00 AM - 1:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="mb-2">&copy; 2025 Gulu Institute of Agriculture</p>
            <p className="text-gray-400">Learning For Reality</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;