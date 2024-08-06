import { useState } from "react";
import { Link } from "react-router-dom";
import Inventory from "../inventoryManagement/Inventory";
import Background from "../../components/background.tsx";

const Home = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div>
      {clicked ? (
        <Inventory />
      ) : (
        <Background className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
          <div className="flex justify-center items-center">
            <div className="w-full sm:w-1/2 mt-12">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 sm:text-4xl sm:leading-10">
                Welcome to Trackata!
              </h1>
              <p className="text-xl mb-8 text-gray-900">
                Trackata is a place to get insights on your inventory and make
                sales.
                <br />
                <span className="block mt-2">
                  Go to{" "}
                  <Link to="/inventory" className="text-blue-500 underline">
                    inventory page
                  </Link>{" "}
                  to add new inventory.
                </span>
              </p>
              <div className="relative">
                {/* <div className="absolute bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg opacity-70 inset-0 animate-pulse transition-opacity duration-1000 group-hover:opacity-100 group-hover:duration-200"></div> */}
                <button
                  onClick={handleClick}
                  className="relative bg-teal-500 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transform hover:scale-105"
                >
                  Input now
                  <svg
                    className="animate-bounce w-6 h-6 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Background>
      )}
    </div>
  );
};

export default Home;
