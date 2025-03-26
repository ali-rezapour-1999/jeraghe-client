import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

const listPage = [
  { title: "عنوان ایده", id: 1 },
  { title: "محتوای ایده", id: 2 },
  { title: "تنظیمات", id: 3 },
];
const BreadcrumbsIdea = ({ step }: { step: number }) => {
  return (
    <div>
      <Breadcrumbs underline="none">
        {listPage.slice(0, step).map((item, index) => (
          <BreadcrumbItem key={index}>{item.title}</BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsIdea;
