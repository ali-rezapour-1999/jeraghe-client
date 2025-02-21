import MainNavBar from "@/components/navbar";
import Link from "next/link";
import React from "react";

const Partner: React.FC = () => {
  return (
    <>
      <MainNavBar />
      <Link href="/partner/create_job_request">
        ثبت درخواست همکار برای ایده
      </Link>
      <div>partner</div>
    </>
  );
};

export default Partner;
