import React from "react";
import Salesstate from "../sales/salesstate";
import { Card, Title } from "@tremor/react";

function MostSoldProduct() {
  const { getTopFourProfitableProducts } = Salesstate();
  const topFourProfitableProducts = getTopFourProfitableProducts();

  return (
    <Card className="p-6 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300">
      <Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Top Four Most Profitable Products
      </Title>
      <div className="space-y-4">
        {topFourProfitableProducts.map((product, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700"
          >
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {product.product}
            </span>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
              N{product.profit}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default MostSoldProduct;
