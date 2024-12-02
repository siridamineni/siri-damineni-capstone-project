import React from "react";
import "./ExerciseByBodyRegion.scss";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"]; // Unique colors for each group
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      style={{ fontFamily: '"Avenir", sans-serif' }}
      x={x}
      y={y}
      fill="black"
      textAnchor={"middle"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExerciseByBodyRegionPieChart = ({ data }) => {
  return (
    <div className="piechart-wrapper">
      <div className="piechart__title-container">
        <h2 className="piechart__title">Body Region Focus in Exercises</h2>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
            activeShape={{}}>
            {data?.map((entry, index) => (
              <Cell
                style={{ outline: "none" }}
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExerciseByBodyRegionPieChart;
