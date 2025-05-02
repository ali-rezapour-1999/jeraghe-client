import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentPosts() {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={post.authorAvatar || "/placeholder.svg"}
              alt={post.author}
            />
            <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="mr-4 space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="ml-1 h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const posts = [
  {
    id: "1",
    title: "۱۰ نکته برای یافتن شغل مناسب",
    author: "علی محمدی",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "۲ روز پیش",
  },
  {
    id: "2",
    title: "چگونه رزومه حرفه‌ای بنویسیم",
    author: "سارا احمدی",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "۳ روز پیش",
  },
  {
    id: "3",
    title: "مهارت‌های ضروری برای برنامه‌نویسان",
    author: "محمد رضایی",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "۵ روز پیش",
  },
  {
    id: "4",
    title: "آینده هوش مصنوعی در بازار کار",
    author: "زهرا کریمی",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "۱ هفته پیش",
  },
  {
    id: "5",
    title: "راهنمای جامع فریلنسینگ",
    author: "امیر حسینی",
    authorAvatar: "/placeholder.svg?height=32&width=32",
    date: "۱ هفته پیش",
  },
];
