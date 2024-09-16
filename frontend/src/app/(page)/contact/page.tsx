import Cover from "@/components/main/Cover/Cover";

import Loading from "@/components/main/Loading/Loading";
import Contact from "@/components/main/Contact/page";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { FaPhoneAlt } from "react-icons/fa";
import { MdFax } from "react-icons/md";
import Contactform from "@/components/main/Contact/ContactForm";

const pageName = "contact";
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

const fetchData = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/contact-lists/`,
    { cache: "no-store" }
  );
  return await data.json();
};

export default async function ContactPage() {
  const contact = await fetchData();
  return (
    <>
      <Loading />
      <Cover
        pageName={"ติดต่อเรา"}
        prevPage={{ pageName: "หน้าแรก", url: "/" }}
      />
      <div className="container mx-auto">
        <div className="py-2 grid grid-cols-2 gap-4  pb-4 w-full">
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-2 ">
              <div className="py-4 border-b border-slate-300">
                <h2 className="text-2xl font-semibold ">
                  บริษัท สปีดมูฟ จำกัด (สำนักงานใหญ่)
                </h2>
                <p>{contact?.addressTH}</p>
              </div>
              <div className="py-4 ">
                <h2 className="text-2xl font-semibold ">ติดต่อ</h2>
                <p>โทร :{contact?.telephone} </p>
                {/* <p>แฟกซ์ : +66 2 751 5259</p> */}
                <p>อีเมล : {contact?.email}</p>
                <p>อีเมล : {contact?.fax}</p>
                <p>ID ไลน์ : @speedmove</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 ">
            <h2 className="text-xl font-semibold text-slate-600">
              ฟอร์มติดต่อ
            </h2>
            <Contactform />
          </div>
        </div>
        <div className="py-6">
          <div dangerouslySetInnerHTML={{ __html: contact?.gMap }}></div>
        </div>
      </div>
    </>
  );
}
