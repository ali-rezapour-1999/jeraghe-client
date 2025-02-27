import React from "react";

const DescriptionForJob: React.FC = () => {
  return (
    <div className="p-5">
      <div className="bg-transparent dark:bg-light-dark py-4 px-10 rounded-2xl">
        <h1 className="text-xl p-4 font-bold border-b-1 pb-2 mb-3">توضیحات</h1>
        <p className="dark:text-gray-300 text-gray-700">
        </p>
      </div>

      <div className="mt-10 bg-transparent dark:bg-light-dark py-4 px-10 rounded-2xl">
        <h1 className="text-xl px-4 font-bold border-b-1 pb-2 mb-3">
          مهارت های مورد نیاز
        </h1>
        <p className="dark:text-gray-300 text-gray-700">
        </p>
      </div>
    </div>
  );
};

export default DescriptionForJob;
