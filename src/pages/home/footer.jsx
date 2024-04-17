import React from "react";

export default function Footer() {
  return (
    <footer class="bg-white shadow dark:bg-[#5063bf]">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Stocks
            </span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Home
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Add Stock
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Stock Insights
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Stocks™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
