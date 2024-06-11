import React from "react";
import { LineChart } from '@tremor/react';
import Salesstate from "../../sales/salesstate";

const ProfitChart = () => {
    const { calculateDailyProfits } = Salesstate();
    const valueFormatter = function (number) {
        return 'N' + new Intl.NumberFormat('us').format(number).toString();
    };
    const chartData = calculateDailyProfits();

    return (
        <>
            <div className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800"> Profit Chart</h2>
                <LineChart
                    className="mt-4 h-72"
                    data={chartData}
                    index="date"
                    yAxisWidth={65}
                    categories={['profit']}
                    colors={['green']}
                    valueFormatter={valueFormatter}
                    xAxisLabel="Date"
                    yAxisLabel="Daily Profit"
                />
            </div>
        </>
    );
}
export default ProfitChart;
