import React from "react";

function Cards({ title, cardContent, children }) {
  return (
    <div className="flex-1 pt-3 p-2">
      <div className="block bg-gray-100 dark:bg-gray-800 p-6 text-gray-800 dark:text-gray-200 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-full">
            {children}
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-lg">{cardContent}</p>
      </div>
    </div>
  );
}

export default Cards;
