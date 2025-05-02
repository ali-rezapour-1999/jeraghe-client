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

export default function Post() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = (status: string) => {
    return posts
      .filter((post) => post.status === status)
      .filter(
        (post) =>
          post.title.includes(searchTerm) ||
          post.category.includes(searchTerm) ||
          post.date.includes(searchTerm)
      );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">مدیریت مقالات</h1>
          <p className="text-muted-foreground">مدیریت و انتشار مقالات وبلاگ</p>
        </div>
        <Button className="group flex items-center gap-1 bg-secondary hover:bg-secondary-dark">
          <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
          <span>مقاله جدید</span>
        </Button>
      </div>

      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-white pb-0 dark:bg-gray-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>مقالات</CardTitle>
              <CardDescription>
                لیست مقالات منتشر شده و پیش‌نویس‌ها
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجو در مقالات..."
                className="w-full pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="published" className="w-full">
            <div className="border-b px-6">
              <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger
                  value="published"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-secondary data-[state=active]:text-secondary"
                >
                  منتشر شده
                  <Badge className="mr-2 bg-accent">
                    {filteredPosts("منتشر شده").length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="drafts"
                  className="relative h-12 rounded-none border-b-2 border-transparent px-4 font-medium data-[state=active]:border-secondary data-[state=active]:text-secondary"
                >
                  پیش‌نویس‌ها
                  <Badge className="mr-2 bg-secondary">
                    {filteredPosts("پیش‌نویس").length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="published" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان</TableHead>
                      <TableHead>دسته‌بندی</TableHead>
                      <TableHead>تاریخ انتشار</TableHead>
                      <TableHead>بازدید</TableHead>
                      <TableHead className="text-left">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts("منتشر شده").map((post) => (
                      <TableRow
                        key={post.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell className="font-medium">
                          {post.title}
                        </TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>{post.views}</TableCell>
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

            <TabsContent value="drafts" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>عنوان</TableHead>
                      <TableHead>دسته‌بندی</TableHead>
                      <TableHead>آخرین ویرایش</TableHead>
                      <TableHead className="text-left">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts("پیش‌نویس").map((post) => (
                      <TableRow
                        key={post.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <TableCell className="font-medium">
                          {post.title}
                        </TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{post.date}</TableCell>
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

const posts = [
  {
    id: "1",
    title: "۱۰ نکته برای یافتن شغل مناسب",
    category: "کاریابی",
    status: "منتشر شده",
    date: "۱۴۰۲/۰۲/۱۵",
    views: "۱,۲۳۴",
  },
  {
    id: "2",
    title: "چگونه رزومه حرفه‌ای بنویسیم",
    category: "کاریابی",
    status: "منتشر شده",
    date: "۱۴۰۲/۰۲/۱۰",
    views: "۹۸۷",
  },
  {
    id: "3",
    title: "مهارت‌های ضروری برای برنامه‌نویسان",
    category: "توسعه",
    status: "منتشر شده",
    date: "۱۴۰۲/۰۲/۰۵",
    views: "۲,۱۵۶",
  },
  {
    id: "4",
    title: "آینده هوش مصنوعی در بازار کار",
    category: "تکنولوژی",
    status: "منتشر شده",
    date: "۱۴۰۲/۰۱/۲۵",
    views: "۱,۵۶۷",
  },
  {
    id: "5",
    title: "راهنمای جامع فریلنسینگ",
    category: "کسب و کار",
    status: "پیش‌نویس",
    date: "۱۴۰۲/۰۲/۲۰",
    views: "۰",
  },
  {
    id: "6",
    title: "تکنیک‌های مصاحبه شغلی",
    category: "کاریابی",
    status: "پیش‌نویس",
    date: "۱۴۰۲/۰۲/۱۸",
    views: "۰",
  },
];
