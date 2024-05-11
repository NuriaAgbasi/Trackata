import React from "react";
import Salesstate from "../sales/salesstate";
import Background from "../../components/background.jsx";
function Orders() {
  const { salesLog } = Salesstate();
  return (
    <Background>
      <h4 class="mb-2 mt-0 text-2xl text-white font-medium leading-tight">
        Orders Log
      </h4>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead class="border-b text-white border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      Order Id
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Time
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Customer
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Product
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salesLog.map((sale, index) => (
                    <tr
                      key={index}
                      className="border-b text-white border-neutral-200 dark:border-white/10"
                    >
                      <td className="px-6 py-4">{index}</td>
                      <td className="px-6 py-4">{sale.time}</td>
                      <td className="px-6 py-4">{sale.date}</td>
                      <td className="px-6 py-4">{sale.customer}</td>
                      <td className="px-6 py-4">{sale.quantity}</td>
                      <td className="px-6 py-4">{sale.product}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default Orders;
