import Link from "next/link";
import Image from "next/image";
import DynamicContent from "../DynamicContent/DynamicContent";

export default function About({ content }: any) {
  return (
    <div className="pt-6  pb-14 sm:pt-20 relative  border-b border-1 border-slate-300">
      <DynamicContent content={content} />
    </div>
  );
}
