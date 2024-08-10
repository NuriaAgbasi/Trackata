import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { Card, Title } from "@tremor/react";

const StockAlert = () => {
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const lowStockThreshold = 10;

    useEffect(() => {
        const fetchStockAlerts = async () => {
            try {
                
                const { data: inventory, error } = await supabase
                    .from('inventory')
                    .select('id, name, stock')
                    .gt('stock', -1);

                if (error) throw error;

                
                const alerts = inventory.filter(product => 
                    product.stock <= 0 || product.stock < lowStockThreshold
                );

                setLowStockProducts(alerts);
            } catch (error) {
                console.error("Error fetching stock alerts:", error);
            }
        };

        fetchStockAlerts();
    }, []);

    return (
        <Card className="p-6 space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300">
            <Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Stock Alerts
            </Title>
            <div className="space-y-4">
                {lowStockProducts.length > 0 ? (
                    lowStockProducts.map((product, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${product.stock <= 0 ? 'bg-red-50 dark:bg-red-700' : 'bg-yellow-50 dark:bg-yellow-700'}`}
                        >
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                                {product.name}
                            </span>
                            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                {product.stock <= 0 ? 'Out of Stock' : `Low Stock: ${product.stock}`}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-600 dark:text-gray-300">
                        All products are sufficiently stocked.
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StockAlert;
