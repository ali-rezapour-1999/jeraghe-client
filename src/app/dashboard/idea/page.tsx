"use client";

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
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function IdeaPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = (status: string) => {
    return jobs
      .filter((job) => job.status === status)
      .filter(
        (job) =>
          job.title.includes(searchTerm) ||
          job.company.includes(searchTerm) ||
          job.location.includes(searchTerm) ||
          job.type.includes(searchTerm)
      );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">مدیریت مشاغل</h1>
          <p className="text-muted-foreground">مدیریت و انتشار فرصت‌های شغلی</p>
        </div>
        <Button className="group flex items-center gap-1 bg-secondary hover:bg-secondary-dark">
          <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
          <span>شغل جدید</span>
        </Button>
      </div>

      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-white pb-0 dark:bg-gray-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>فرصت‌های شغلی</CardTitle>
              <CardDescription>لیست فرصت‌های شغلی منتشر شده</CardDescription>
            </div>
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجو در مشاغل..."
                className="w-full pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="active" className="w-full">
            <div className="border-b px-6">
              <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="active"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-secondary data-[state=active]:text-secondary"
                >
                  فعال
                  <Badge className="mr-2 bg-accent">
                    {filteredJobs("فعال").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-secondary data-[state=active]:text-secondary"
                >
                  در انتظار
                  <Badge className="mr-2 bg-secondary">
                    {filteredJobs("در انتظار").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="closed"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-secondary data-[state=active]:text-secondary"
                >
                  بسته شده
                  <Badge className="mr-2 bg-muted-foreground">
                    {filteredJobs("بسته شده").length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="active" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان شغلی</TableHead>
                      <TableHead>شرکت</TableHead>
                      <TableHead>موقعیت</TableHead>
                      <TableHead>نوع همکاری</TableHead>
                      <TableHead>تاریخ انتشار</TableHead>
                      <TableHead className="text-left">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs("فعال").map((job) => (
                      <TableRow
                        key={job.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>{job.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">مشاهده</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">ویرایش</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">حذف</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان شغلی</TableHead>
                      <TableHead>شرکت</TableHead>
                      <TableHead>موقعیت</TableHead>
                      <TableHead>نوع همکاری</TableHead>
                      <TableHead>تاریخ انتشار</TableHead>
                      <TableHead className="text-left">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs("در انتظار").map((job) => (
                      <TableRow
                        key={job.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>{job.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">مشاهده</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">ویرایش</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">حذف</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="closed" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان شغلی</TableHead>
                      <TableHead>شرکت</TableHead>
                      <TableHead>موقعیت</TableHead>
                      <TableHead>نوع همکاری</TableHead>
                      <TableHead>تاریخ انتشار</TableHead>
                      <TableHead className="text-left">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs("بسته شده").map((job) => (
                      <TableRow
                        key={job.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.type}</TableCell>
                        <TableCell>{job.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">مشاهده</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">ویرایش</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">حذف</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

const jobs = [
  {
    id: "1",
    title: "توسعه‌دهنده فرانت‌اند",
    company: "تک‌نوین",
    location: "تهران",
    type: "تمام وقت",
    status: "فعال",
    date: "۱۴۰۲/۰۲/۱۵",
  },
  {
    id: "2",
    title: "طراح UX/UI",
    company: "دیجی‌کالا",
    location: "تهران",
    type: "تمام وقت",
    status: "فعال",
    date: "۱۴۰۲/۰۲/۱۰",
  },
  {
    id: "3",
    title: "برنامه‌نویس بک‌اند",
    company: "اسنپ",
    location: "تهران",
    type: "دورکاری",
    status: "در انتظار",
    date: "۱۴۰۲/۰۲/۰۵",
  },
  {
    id: "4",
    title: "مدیر محصول",
    company: "تپسی",
    location: "اصفهان",
    type: "تمام وقت",
    status: "بسته شده",
    date: "۱۴۰۲/۰۱/۲۵",
  },
  {
    id: "5",
    title: "متخصص هوش مصنوعی",
    company: "فناپ",
    location: "تهران",
    type: "قراردادی",
    status: "فعال",
    date: "۱۴۰۲/۰۱/۲۰",
  },
  {
    id: "6",
    title: "مهندس DevOps",
    company: "دیجی‌کالا",
    location: "تهران",
    type: "تمام وقت",
    status: "در انتظار",
    date: "۱۴۰۲/۰۲/۱۸",
  },
];
