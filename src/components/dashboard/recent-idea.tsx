import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RecentIdea() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>عنوان شغلی</TableHead>
          <TableHead>شرکت</TableHead>
          <TableHead>موقعیت</TableHead>
          <TableHead>نوع همکاری</TableHead>
          <TableHead>تاریخ انتشار</TableHead>
          <TableHead>وضعیت</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.title}</TableCell>
            <TableCell>{job.company}</TableCell>
            <TableCell>{job.location}</TableCell>
            <TableCell>{job.type}</TableCell>
            <TableCell>{job.date}</TableCell>
            <TableCell>
              <Badge
                variant={
                  job.status === "فعال"
                    ? "default"
                    : job.status === "در انتظار"
                      ? "secondary"
                      : "destructive"
                }
                className={
                  job.status === "فعال"
                    ? "bg-accent hover:bg-accent-dark"
                    : job.status === "در انتظار"
                      ? "bg-secondary hover:bg-secondary-dark"
                      : "bg-destructive hover:bg-destructive/90"
                }
              >
                {job.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const jobs = [
  {
    id: "1",
    title: "توسعه‌دهنده فرانت‌اند",
    company: "تک‌نوین",
    location: "تهران",
    type: "تمام وقت",
    date: "۲ روز پیش",
    status: "فعال",
  },
  {
    id: "2",
    title: "طراح UX/UI",
    company: "دیجی‌کالا",
    location: "تهران",
    type: "تمام وقت",
    date: "۳ روز پیش",
    status: "فعال",
  },
  {
    id: "3",
    title: "برنامه‌نویس بک‌اند",
    company: "اسنپ",
    location: "تهران",
    type: "دورکاری",
    date: "۵ روز پیش",
    status: "در انتظار",
  },
  {
    id: "4",
    title: "مدیر محصول",
    company: "تپسی",
    location: "اصفهان",
    type: "تمام وقت",
    date: "۱ هفته پیش",
    status: "بسته شده",
  },
  {
    id: "5",
    title: "متخصص هوش مصنوعی",
    company: "فناپ",
    location: "تهران",
    type: "قراردادی",
    date: "۱ هفته پیش",
    status: "فعال",
  },
];
