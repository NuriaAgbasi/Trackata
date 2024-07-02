import React from "react";

function Background({ children, className }) {
  return (
    <div
      className={`min-h-screen ${className} bg-gradient-to-b from-blue-200 to-teal-200 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center`}
    >
      <div className="max-w-7xl mx-auto  sm:p-0">{children}</div>
    </div>
  );
}

export default Background;
