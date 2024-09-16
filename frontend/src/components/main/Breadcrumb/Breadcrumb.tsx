"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowRight } from "react-icons/md";

interface BreadcrumbProps {
  pageName: string;
  prevPage: { pageName: string | null; url: string | null };
}
const Breadcrumb = ({ pageName, prevPage }: BreadcrumbProps) => {
  return (
    <>
      <div className=" hidden md:flex text-slate-400 ">
        <nav>
          <ol className="flex items-center gap-2">
            {prevPage?.pageName && prevPage?.url ? (
              <li>
                <Link
                  className="text-sm flex items-center "
                  href={prevPage?.url}
                >
                  <span>{prevPage?.pageName}</span>
                  <MdKeyboardArrowRight size={20} />
                </Link>
              </li>
            ) : (
              <li>
                <span className="text-sm ">{prevPage?.pageName}</span>
              </li>
            )}

            <li className="text-sm ">{pageName}</li>
          </ol>
        </nav>
      </div>
    </>
  );
};

export default Breadcrumb;
