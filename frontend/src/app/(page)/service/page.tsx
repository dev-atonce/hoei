import BlogSection from "@/components/main/BlogSection/BlogSection";
import Cover from "@/components/main/Cover/Cover";
import Loading from "@/components/main/Loading/Loading";
import TopSection from "@/components/main/TopSection/TopSection";
import ServiceSection from "@/components/main/ServiceSection/ServiceSection";
import { Metadata, ResolvingMetadata } from "next";

const pageName = "service";

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const lng = "TH";

  const seoRoute = `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/seo/page-name/${pageName}`;

  // fetch data
  const response = await fetch(seoRoute, { cache: "no-store" }).then((res) =>
    res.json()
  );

  return {
    title: response[`seoTitle${lng}`],
    description: response[`seoDescription${lng}`],
    keywords: response[`seoKeyword${lng}`],
  };
}
export default function ServicePage() {
  return (
    <>
      <Loading />
      <Cover
        pageName={"บริการของเรา"}
        prevPage={{ pageName: "หน้าแรก", url: "/" }}
      />
      <div className="container mx-auto py-4">
        <TopSection />
        <ServiceSection />
      </div>
      <div className="bg-slate-100">
        <div className="container mx-auto flex flex-col items-center py-12">
          <p className=" text-[#E61717] p-2 text-2xl">
            สอบถามรายละเอียดเพิ่มเติม หรือเพื่อจองวันขนย้ายได้ที่
          </p>
          <p className="text-2xl text-slate-800">
            โทร. +66 2 751 5269 Hotline. +666 5056 4598
          </p>
        </div>
      </div>
    </>
  );
}
