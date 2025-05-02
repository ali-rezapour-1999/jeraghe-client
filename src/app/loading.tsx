import { Heading } from "@/components/ui/text";
import "@/style/loading.css";

export default function Loading() {
  <div className="flex gap-2 py-3 items-center">
    <div className="loader" />
    <Heading as="h1" className="text-primary-dark dark:text-light">
      در حال بارگذاری اطلاعات...
    </Heading>
  </div>;
}
