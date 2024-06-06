import React, { useState } from "react";
import { TEChart } from "tw-elements-react";
import Inventorystate from "../../inventoryManagement/inventorystate.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "../../../components/dropdown.tsx";

export default function ChartLine(): JSX.Element {
  const { calculateDailyProfits } = Inventorystate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredOption, setHoveredOption] = useState("");
  const [showHoveredContent, setShowHoveredContent] = useState(false);

  const dailyProfits = calculateDailyProfits();
  const labels = Object.keys(dailyProfits);
  const data = Object.values(dailyProfits);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleHover = (item: string) => {
    setHoveredOption(item);
    setShowHoveredContent(true);
  };

  const handleHoverLeave = () => {
    setShowHoveredContent(false);
  };

  const getWeeksOfMonth = (date: Date): string[] => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const weeks: string[] = [];
    let currentDay = firstDayOfMonth;

    while (currentDay <= lastDayOfMonth) {
      const weekStart = new Date(currentDay);
      const weekEnd = new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate() + 6
      );
      weeks.push(
        `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
      );
      currentDay.setDate(currentDay.getDate() + 7);
    }

    return weeks;
  };

  const getYears = (startYear: number): number[] => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <div className="bg-gray-200 p-4 relative">
      <div className="flex items-center mb-4">
        <Dropdown
          title="Select Period"
          items={["Day", "Week", "Month", "Year"]}
          position="dropright"
          onHover={handleHover}
          onMouseLeave={handleHoverLeave}
        />
        {showHoveredContent && (
          <div className="ml-4 absolute top-0 left-full bg-white p-4 shadow">
            {hoveredOption === "Day" && (
              <div className="mb-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                />
              </div>
            )}
            {hoveredOption === "Week" && (
              <div className="mb-4">
                <ul>
                  {getWeeksOfMonth(selectedDate).map((week, index) => (
                    <li key={index}>{week}</li>
                  ))}
                </ul>
              </div>
            )}
            {hoveredOption === "Month" && (
              <div className="mb-4">
                <ul>
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthDate = new Date(
                      selectedDate.getFullYear(),
                      index,
                      1
                    );
                    return (
                      <li key={index}>
                        {monthDate.toLocaleString("default", { month: "long" })}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {hoveredOption === "Year" && (
              <div className="mb-4">
                <ul>
                  {getYears(2021).map((year, index) => (
                    <li key={index}>{year}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <TEChart
        type="line"
        data={{
          labels: labels,
          datasets: [
            {
              label: "Daily Profit",
              data: data,
            },
          ],
        }}
      />
    </div>
  );
}
