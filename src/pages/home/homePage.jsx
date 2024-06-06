import ReusableLink from "../..//components/rusablelink";
import Image from "../../image/image1.jpeg";
import { useState } from "react";
import Inventory from "../inventoryManagement/Inventory";
import Typewriter from "./typeWriter.tsx";
import Background from "../../components/background.tsx";

// ToDo: Create a SideBAR navigation that comtains the following: Inventory, Sales, Orders, Dashboard, Team, Profile
// Make it a signle page application
// Make the page responsive (depending on the screen size, the page should adjust accordingly)
// Make this a protected route, so you can't access the page unless you are logged in
// Chage from Home to homePage
// remove addStock and move it to inventory page

const Home = () => {
  const [clicked, SetClicked] = useState(false);
  const handleOnclick = () => {
    SetClicked(true);
  };
  return (
    <ReusableLink>
      {clicked ? (
        <Inventory />
      ) : (
        <Background>
          <div className="flex justify-center items-center">
            <div className="w-1/2 mt-72 ml-16">
              <div id="font" className="text-xl font-bold mb-2">
                <h1 className=" pr-9">
                  <Typewriter />
                </h1>
                <h1 className="mt-2 text-3xl font-bold leading-7 bg-blue w-fit rounded text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  The best place to Improve your bussiness
                </h1>
                <p className="text-xl ml-40 leading-7 font-semibold text-gray-900 sm:truncate sm:text-xl sm:tracking-tight rounded">
                  Input your stocks
                </p>
              </div>
              <div className="relative inline-flex ml-40 group">
                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                <div
                  onClick={handleOnclick}
                  title="Input"
                  className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Input now
                </div>
              </div>
            </div>
            <div className="w-1/3 mt-56 mr-20 flex items-center justify-center">
              <img src={Image} alt="people" className="w-3/4 rounded-full" />
            </div>
          </div>
        </Background>
      )}
    </ReusableLink>
  );
};

export default Home;
