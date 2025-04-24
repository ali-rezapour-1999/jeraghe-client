import React from "react";
import { Heading, Paragraph } from "../ui/text";

const DescriptionForJob: React.FC = () => {
  return (
    <div className="p-5">
      <div className="bg-transparent dark:bg-light-dark py-4 px-10 rounded-2xl">
        <Heading as="h1" className="text-xl p-4 font-bold border-b-1 pb-2 mb-3">
          توضیحات
        </Heading>
        <Paragraph className="dark:text-gray-300 text-gray-700"></Paragraph>
      </div>

      <div className="mt-10 bg-transparent dark:bg-light-dark py-4 px-10 rounded-2xl">
        <Heading
          as="h1"
          className="text-xl px-4 font-bold border-b-1 pb-2 mb-3"
        >
          مهارت های مورد نیاز
        </Heading>
        <Paragraph className="dark:text-gray-300 text-gray-700"></Paragraph>
      </div>
    </div>
  );
};

export default DescriptionForJob;
