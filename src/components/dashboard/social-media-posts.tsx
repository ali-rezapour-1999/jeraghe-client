import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  MessageCircle,
  Repeat,
  Twitter,
} from "lucide-react";

export function SocialMediaPosts() {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={post.profileImage || "/placeholder.svg"}
                alt={post.username}
              />
              <AvatarFallback>{post.username.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.username}</span>
                  <post.platform.icon
                    className={`h-4 w-4 ${post.platform.color}`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    post.promoted ? "border-secondary text-secondary" : ""
                  }
                >
                  {post.promoted ? "تبلیغاتی" : "ارگانیک"}
                </Badge>
              </div>
              <p>{post.content}</p>
              {post.image && (
                <div className="mt-2 rounded-lg overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="تصویر پست"
                    className="w-full h-auto"
                  />
                </div>
              )}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-xs">{post.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Repeat className="h-4 w-4" />
                  <span className="text-xs">{post.shares}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
      <div className="flex justify-center">
        <Button variant="outline">بارگذاری بیشتر</Button>
      </div>
    </div>
  );
}

const posts = [
  {
    id: 1,
    username: "شرکت شما",
    profileImage: "/placeholder.svg?height=40&width=40",
    platform: { name: "instagram", icon: Instagram, color: "text-pink-500" },
    date: "۲ ساعت پیش",
    content:
      "خوشحالیم که محصول جدید خود را معرفی می‌کنیم! با ویژگی‌های منحصر به فرد و طراحی مدرن، این محصول تجربه کاربری فوق‌العاده‌ای را برای شما به ارمغان می‌آورد. #محصول_جدید #نوآوری",
    image: "/placeholder.svg?height=300&width=500",
    likes: "۱۲۵",
    comments: "۲۳",
    shares: "۴۵",
    promoted: true,
  },
  {
    id: 2,
    username: "شرکت شما",
    profileImage: "/placeholder.svg?height=40&width=40",
    platform: { name: "twitter", icon: Twitter, color: "text-blue-500" },
    date: "۱ روز پیش",
    content:
      "مقاله جدید ما درباره «راهنمای جامع کاریابی در سال ۱۴۰۲» را در وبلاگ ما بخوانید. لینک در بیو 👆 #کاریابی #مشاغل",
    image: null,
    likes: "۸۷",
    comments: "۱۲",
    shares: "۳۴",
    promoted: false,
  },
  {
    id: 3,
    username: "شرکت شما",
    profileImage: "/placeholder.svg?height=40&width=40",
    platform: { name: "linkedin", icon: Linkedin, color: "text-blue-700" },
    date: "۳ روز پیش",
    content:
      "خوشحالیم اعلام کنیم که وبینار آموزشی «مهارت‌های ضروری برای موفقیت در بازار کار» در تاریخ ۲۰ خرداد برگزار خواهد شد. برای ثبت‌نام به وب‌سایت ما مراجعه کنید.",
    image: "/placeholder.svg?height=300&width=500",
    likes: "۱۵۶",
    comments: "۳۲",
    shares: "۶۷",
    promoted: false,
  },
  {
    id: 4,
    username: "شرکت شما",
    profileImage: "/placeholder.svg?height=40&width=40",
    platform: { name: "facebook", icon: Facebook, color: "text-blue-600" },
    date: "۵ روز پیش",
    content:
      "با افتخار اعلام می‌کنیم که شرکت ما به عنوان یکی از برترین شرکت‌های حوزه کاریابی در سال ۱۴۰۱ انتخاب شده است. از همه مشتریان و همکاران عزیز سپاسگزاریم.",
    image: "/placeholder.svg?height=300&width=500",
    likes: "۲۱۰",
    comments: "۴۵",
    shares: "۷۸",
    promoted: false,
  },
];
