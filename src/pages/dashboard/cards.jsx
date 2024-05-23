import React from "react";

function Cards({ title, cardContent, children }) {
  return (
    <div className="flex-1 pt-3 p-2">
      <div className="block  bg-white p-6 text-surface shadow-secondary-1 dark:bg-surface-dark min-h-48 dark:text-white">
        <div className="flex items-center ">
          <div className="bg-gray-300 rounded-full p-6">{children}</div>
        </div>
        <p className="text-2xl mt-4">{cardContent}</p>
        <h5 className="mb-3  text-gray-400">{title}</h5>
      </div>
    </div>
  );
}

export default Cards;
