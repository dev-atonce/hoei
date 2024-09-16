import Link from "next/link";
import BlogSection from "../BlogSection/BlogSection";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function Blog() {
  return (
    <div className="border-slate-200 py-12 ">
      <div className="flex items-center justify-between">
        <h2 className="text-slate-800 text-2xl font-semibold">บทความ</h2>
      </div>
      <div className="py-6">
        <BlogSection
          home={true}
          limit={6}
          typeBlog={["general", "customer", "selfedit"]}
        />
      </div>
      <div className="flex justify-center">
        <Link
          href="/news-activity"
          className=" text-white rounded-full px-4 py-2 flex items-center bg-[#EE3E3E]"
        >
          ดูทั้งหมด
        </Link>
      </div>
    </div>
  );
}
