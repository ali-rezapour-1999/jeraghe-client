'use client'
import {
  Card,
  CardContent, CardDescription, CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentPosts } from "@/components/dashboard/recent-posts";
import { ArrowDown, ArrowUp, BookText, Briefcase, Ticket, Users } from "lucide-react";
import { RecentIdea } from "@/components/dashboard/recent-idea";
import "@/style/dashboard.css"
import { useAuthStore } from "@/store/authState";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface User {
  username: string;
  [key: string]: any;
}

interface AuthStore {
  user: User | null;
  [key: string]: any;
}

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  isPositive?: boolean;
}

const StatCard = ({ title, value, change, icon: Icon, isPositive = true }: StatCardProps) => (
  <Card className="border-none shadow-sm transition-all duration-200 hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20">
        <Icon className="h-4 w-4 text-secondary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <div className={cn(
          "mt-1 flex items-center text-xs",
          isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        )}>
          {isPositive ?
            <ArrowUp className="mr-1 h-3 w-3" /> :
            <ArrowDown className="mr-1 h-3 w-3" />
          }
          <span>{change}</span>
        </div>
      )}
    </CardContent>
  </Card>
);

interface StatData {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  isPositive: boolean;
}

export default function DashboardPage() {
  const { user } = useAuthStore() as AuthStore;

  const stats: StatData[] = [
    {
      title: "مقالات منتشر شده",
      value: "۱۲۵",
      change: "+۲۴.۵% نسبت به ماه قبل",
      icon: BookText,
      isPositive: true,
    },
    {
      title: "فرصت‌های شغلی",
      value: "۴۵",
      change: "+۱۸.۲% نسبت به ماه قبل",
      icon: Briefcase,
      isPositive: true,
    },
    {
      title: "بازدیدکنندگان",
      value: "۱۲,۲۳۴",
      change: "+۱۹% نسبت به ماه قبل",
      icon: Users,
      isPositive: true,
    },
    {
      title: "تیکت‌های باز",
      value: "۷",
      change: "-۳ نسبت به هفته قبل",
      icon: Ticket,
      isPositive: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-primary-light p-6 shadow-sm dark:bg-gray-800">
        <h1 className="text-3xl font-bold tracking-tight">سلام، {user?.username} 👋</h1>
        <p className="mt-2 text-muted-foreground">
          خلاصه وضعیت وبلاگ و کاریابی شما در یک نگاه
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            isPositive={stat.isPositive}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle>آمار بازدید</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle>آخرین مقالات</CardTitle>
            <CardDescription>۵ مقاله اخیر منتشر شده در وبلاگ</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPosts />
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>آخرین ایده های</CardTitle>
          <CardDescription>
            ایده های شغلی اخیر منتشر شده در سایت
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentIdea />
        </CardContent>
      </Card>
    </div>
  );
}
