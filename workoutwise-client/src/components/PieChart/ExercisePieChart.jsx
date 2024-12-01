import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"]; // Unique colors for each group

const ExercisePieChart = ({ data }) => {
  return (
    <ResponsiveContainer width={400} height={400}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%" // Center X position
          cy="50%" // Center Y position
          outerRadius={120} // Size of the pie
          innerRadius={50}
          dataKey="value" // Specifies the key for value representation
          nameKey="name" // Specifies the key for name representation
          label // Displays labels on slices
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExercisePieChart;
