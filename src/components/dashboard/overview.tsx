"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "فروردین",
    total: 1200,
  },
  {
    name: "اردیبهشت",
    total: 1900,
  },
  {
    name: "خرداد",
    total: 2300,
  },
  {
    name: "تیر",
    total: 3200,
  },
  {
    name: "مرداد",
    total: 4100,
  },
  {
    name: "شهریور",
    total: 3800,
  },
  {
    name: "مهر",
    total: 4300,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "right",
            direction: "rtl",
          }}
          formatter={(value) => [`${value.toLocaleString()} بازدید`, "تعداد"]}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-secondary"
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
