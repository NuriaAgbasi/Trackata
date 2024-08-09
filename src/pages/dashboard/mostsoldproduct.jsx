import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Card, Title } from "@tremor/react";

const MostSoldProduct = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const { data: sales, error } = await supabase
          .from("sales")
          .select("product_id, price, quantity")
          .order("product_id", { ascending: true });

        if (error) throw error;

        const productMap = sales.reduce((acc, sale) => {
          const { product_id, price, quantity } = sale;
          const revenue = price * quantity;

          if (!acc[product_id]) {
            acc[product_id] = { totalRevenue: 0 };
          }
          acc[product_id].totalRevenue += revenue;

          return acc;
        }, {});

        const sortedProducts = Object.keys(productMap)
          .map((productId) => ({
            productId,
            ...productMap[productId],
          }))
          .sort((a, b) => b.totalRevenue - a.totalRevenue);

        setTopProducts(sortedProducts.slice(0, 4));
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <Card className="p-6 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300">
      <Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Top Four Most Profitable Products
      </Title>
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700"
          >
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              Product ID: {product.productId}
            </span>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
              N{new Intl.NumberFormat("en-GB").format(product.totalRevenue)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MostSoldProduct;
