import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Plus, Search } from "lucide-react";
import { Link } from "@/components/ui/link";

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between dark:bg-gray-800 p-8 rounded-2xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">تیکت‌ها</h1>
          <p className="text-muted-foreground">مدیریت تیکت‌های پشتیبانی</p>
        </div>
        <Link className="flex items-center bg-primary rounded-md px-3 py-2 text-xl" href={"/idea/create"}>
          <Plus className="ml-2 h-4 w-4" />
          تیکت جدید
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>تیکت‌های پشتیبانی</CardTitle>
          <CardDescription>لیست تیکت‌های پشتیبانی دریافت شده</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجو در تیکت‌ها..."
                className="w-full pr-8"
              />
            </div>
            <Button variant="outline">فیلتر</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شماره تیکت</TableHead>
                <TableHead>موضوع</TableHead>
                <TableHead>کاربر</TableHead>
                <TableHead>اولویت</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>تاریخ ایجاد</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">#{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.user}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        ticket.priority === "بالا"
                          ? "border-red-500 text-red-500"
                          : ticket.priority === "متوسط"
                            ? "border-amber-500 text-amber-500"
                            : "border-green-500 text-green-500"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === "باز"
                          ? "default"
                          : ticket.status === "در حال بررسی"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        ticket.status === "باز"
                          ? "bg-accent hover:bg-accent-dark"
                          : ticket.status === "در حال بررسی"
                            ? "bg-secondary hover:bg-secondary-dark"
                            : ""
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">مشاهده</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">پاسخ</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

const tickets = [
  {
    id: "1001",
    subject: "مشکل در آپلود تصاویر",
    user: "علی محمدی",
    priority: "بالا",
    status: "باز",
    date: "۱۴۰۲/۰۲/۱۵",
  },
  {
    id: "1002",
    subject: "سوال در مورد نحوه انتشار مقاله",
    user: "سارا احمدی",
    priority: "متوسط",
    status: "در حال بررسی",
    date: "۱۴۰۲/۰۲/۱۴",
  },
  {
    id: "1003",
    subject: "درخواست ویژگی جدید",
    user: "محمد رضایی",
    priority: "پایین",
    status: "در حال بررسی",
    date: "۱۴۰۲/۰۲/۱۲",
  },
  {
    id: "1004",
    subject: "گزارش خطا در صفحه پروفایل",
    user: "زهرا کریمی",
    priority: "بالا",
    status: "باز",
    date: "۱۴۰۲/۰۲/۱۰",
  },
  {
    id: "1005",
    subject: "سوال در مورد پرداخت",
    user: "امیر حسینی",
    priority: "متوسط",
    status: "بسته شده",
    date: "۱۴۰۲/۰۲/۰۵",
  },
];
