import Link from "next/link";
import React, { ReactNode } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

interface CardDataStatsProps {
  title: string;
  link: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  link,
  children,
}) => {
  return (
    <div className="rounded-md border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-sm font-bold text-black dark:text-white">
            {title}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <span className={`flex items-center gap-1 text-sm font-medium text-meta-5`}>
          <Link href={link}>click</Link>
          <FaLongArrowAltRight />
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
