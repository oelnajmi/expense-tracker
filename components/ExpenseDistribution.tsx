"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseDistributionProps {
  expenseData: { name: string; amount: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground p-2 border rounded shadow-md">
        <p className="font-semibold">{label}</p>
        <p>${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const COLORS = [
  "#FF6384", // Bright Pink
  "#36A2EB", // Bright Blue
  "#FFCE56", // Bright Yellow
  "#4BC0C0", // Teal
  "#9966FF", // Purple
  "#FF9F40", // Orange
  "#FF6384", // Bright Pink (repeated)
];

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        style={{ fontSize: "12px" }}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function ExpenseDistribution({
  expenseData,
}: ExpenseDistributionProps) {
  // Sort data by amount in descending order
  const sortedData = [...expenseData].sort((a, b) => b.amount - a.amount);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount">
                {sortedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
