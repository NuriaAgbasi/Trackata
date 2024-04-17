import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "../pages/home/home";
import AddStock from "../pages/addStock/addStock";
import Contact from "../pages/Contact";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <Router>
      <nav className="bg-[#5063bf] p-4 pr-0">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white font-bold text-lg">Stocks</span>
          </div>
          <div className=" flex">
            <div className="text-sm lg:flex-grow">
              <Link
                to="/"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
              >
                Home
              </Link>
              <Link
                to="/AddStock"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
              >
                Add Stock
              </Link>
              <Link
                to="/Contact"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
              >
                Contact
              </Link>
            </div>
            <div className="">
              <button
                className=" text-white hover:text-gray-300 focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg
                  className=" w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {dropdownOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm18 6H3v-2h18v2z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6h16v2H4V6zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                    />
                  )}
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-10 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg">
                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Web Design
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Graphic Design
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    SEO
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes className="ml-0 lg:ml-6">
        <Route exact path="/" element={<Home />} />
        <Route path="/AddStock" element={<AddStock />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
