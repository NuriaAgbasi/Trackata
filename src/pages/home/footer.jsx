import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              Stocks
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/" className="hover:text-blue-500 me-4 md:me-6">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-blue-500 me-4 md:me-6">
                Add Stock
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-blue-500 me-4 md:me-6">
                Stock Insights
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-blue-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-600 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:text-blue-500">
            Stocks™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
