import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import Salesstate from "../../sales/salesstate";

const ProfitChart = () => {
    const { calculateDailyProfits } = Salesstate();
    const chartData = calculateDailyProfits();

    const valueFormatter = (number) => {
        return 'N' + new Intl.NumberFormat('us').format(number).toString();
    };

    if (chartData.length === 0) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Profit Chart</h2>
                <p className="text-gray-600">No profit has been made yet. Make a sale to see data.</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Profit Chart</h2>
            <div className="inline-block min-w-full overflow-x-auto">
                <LineChart
                    width={Math.max(800, chartData.length * 80)}
                    height={400}
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}

                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        label={{ value: "Date", position: "bottom" }}
                        minTickGap={20}
                    />
                    <YAxis
                        label={{
                            value: "Daily Profit",
                            angle: -90,
                            position: "insideLeft",
                        }}
                        tickFormatter={valueFormatter}
                    />
                    <Tooltip formatter={valueFormatter} />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="green" />
                </LineChart>
            </div>
        </div>
    );
};

export default ProfitChart;
