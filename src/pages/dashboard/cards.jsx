import React from "react";

function Cards({ title, cardContent, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center space-x-4 transition-all duration-300 hover:shadow-xl">
      <div className="text-blue-500 dark:text-blue-400">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          {cardContent}
        </p>
      </div>
    </div>
  );
}

export default Cards;
