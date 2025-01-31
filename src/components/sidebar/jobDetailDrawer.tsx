"use client";

import React from "react";
import {
  Tabs,
  Tab,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Bookmark } from "lucide-react";
import DescriptionForJob from "../section/descriptionForJob";
import JobOwnerDetial from "../section/jobOwnerDetail";
import Btn from "../button/btn";

interface JobDetialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryItemTempalte = ({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) => {
  return (
    <div className="flex flex-col shadow w-full justify-center items-center rounded-2xl overflow-hidden">
      <span className="bg-darkPrimary text-light dark:bg-light-dark py-2 text-center w-full text-dark">
        {title}
      </span>
      <span className="bg-light  dark:bg-darkPrimary-dark text-center w-full px-5 py-2 text-dark">
        {detail}
      </span>
    </div>
  );
};

const JobDetailDrawer: React.FC<JobDetialDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer
      placement="right"
      isOpen={isOpen}
      size="5xl"
      backdrop="blur"
      onClose={onClose}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader>
              <section className="flex items-center justify-between w-full border-b-1 pb-2">
                <div className="flex items-center ">
                  <Image
                    src={logo}
                    alt="job request profile"
                    width={100}
                    height={100}
                    className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] object-contain"
                  />
                  <div className="flex flex-col gap-2 mx-2">
                    <h4 className="text-md md:text-xl font-bold">
                      طراحی سایت جرقه
                    </h4>
                    <h6 className="text-sm">برنامه نویسی و حوضه های وابسته</h6>
                  </div>
                </div>
                <Btn className="rounded-2xl dark:bg-dark-dark">
                  <Bookmark />
                </Btn>
              </section>
            </DrawerHeader>
            <DrawerBody>
              <section className="w-full ">
                <section className="flex flex-col lg:flex-row justify-between items-center my-5 px-2 gap-3 border-b-1 pb-5">
                  <CategoryItemTempalte
                    title="دسته بندی"
                    detail="برنامه نویسی"
                  />
                  <CategoryItemTempalte
                    title="موقعیت مکانی"
                    detail="مازندران / بابل"
                  />
                  <CategoryItemTempalte
                    title="زمان مورد نیاز روزانه"
                    detail="۱ الی ۴ ساعت"
                  />
                </section>
                <section className="w-full">
                  <Tabs
                    className="w-full drawer-job-content-select max-w-full"
                    aria-label="drawer-job-content-select"
                    radius="full"
                  >
                    <Tab
                      key="desiptionConponents"
                      className="w-full"
                      title="توضیحات"
                    >
                      <DescriptionForJob />
                    </Tab>
                    <Tab key="jobOwnerDetial" title="درباره ثبت کننده ">
                      <JobOwnerDetial />
                    </Tab>
                  </Tabs>
                </section>
              </section>
            </DrawerBody>
            <DrawerFooter className="flex justify-center items-center">
              <Btn className="w-full dark:bg-light-light dark:text-primary text-lg">
                درخواست همکاری
              </Btn>

              <Btn
                onClick={onClose}
                className="bg-red-300 dark:bg-red-500 w-40"
              >
                بستن
              </Btn>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default JobDetailDrawer;
