import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentPosts() {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center">
          <Avatar className="h-9 w-9">
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
    authorAvatar: "",
    date: "۲ روز پیش",
  },
  {
    id: "2",
    title: "چگونه رزومه حرفه‌ای بنویسیم",
    author: "سارا احمدی",
    authorAvatar: "",
    date: "۳ روز پیش",
  },
  {
    id: "3",
    title: "مهارت‌های ضروری برای برنامه‌نویسان",
    author: "محمد رضایی",
    authorAvatar: "",
    date: "۵ روز پیش",
  },
  {
    id: "4",
    title: "آینده هوش مصنوعی در بازار کار",
    author: "زهرا کریمی",
    authorAvatar: "",
    date: "۱ هفته پیش",
  },
  {
    id: "5",
    title: "راهنمای جامع فریلنسینگ",
    author: "امیر حسینی",
    authorAvatar: "",
    date: "۱ هفته پیش",
  },
];
