"use client";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "فروردین",
    instagram: 1200,
    twitter: 800,
    linkedin: 600,
    facebook: 400,
  },
  {
    name: "اردیبهشت",
    instagram: 1500,
    twitter: 1000,
    linkedin: 700,
    facebook: 500,
  },
  {
    name: "خرداد",
    instagram: 1800,
    twitter: 1200,
    linkedin: 900,
    facebook: 600,
  },
  {
    name: "تیر",
    instagram: 2200,
    twitter: 1400,
    linkedin: 1100,
    facebook: 700,
  },
  {
    name: "مرداد",
    instagram: 2500,
    twitter: 1600,
    linkedin: 1200,
    facebook: 800,
  },
  {
    name: "شهریور",
    instagram: 2300,
    twitter: 1500,
    linkedin: 1000,
    facebook: 750,
  },
];

const engagementData = [
  {
    name: "فروردین",
    engagement: 15,
  },
  {
    name: "اردیبهشت",
    engagement: 18,
  },
  {
    name: "خرداد",
    engagement: 25,
  },
  {
    name: "تیر",
    engagement: 30,
  },
  {
    name: "مرداد",
    engagement: 28,
  },
  {
    name: "شهریور",
    engagement: 32,
  },
];

export function SocialMediaStats() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">رشد دنبال‌کنندگان</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{ textAlign: "right", direction: "rtl" }}
              formatter={(value, name) => {
                const persianNames = {
                  instagram: "اینستاگرام",
                  twitter: "توییتر",
                  linkedin: "لینکدین",
                  facebook: "فیسبوک",
                };
                return [value, persianNames[name as keyof typeof persianNames]];
              }}
            />
            <Bar dataKey="instagram" fill="#E1306C" radius={[4, 4, 0, 0]} />
            <Bar dataKey="twitter" fill="#1DA1F2" radius={[4, 4, 0, 0]} />
            <Bar dataKey="linkedin" fill="#0077B5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="facebook" fill="#4267B2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">نرخ تعامل (درصد)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={engagementData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{ textAlign: "right", direction: "rtl" }}
              formatter={(value) => [`${value}%`, "نرخ تعامل"]}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#FF6B4A"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
