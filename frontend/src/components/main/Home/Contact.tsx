import Image from "next/image";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Contact() {
  return (
    <div className=" py-20 relative bg-[#FAFAFA]">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-6 lg:grid-cols-12 gap-10">
          <div className="col-span-6">
            <div className="flex flex-col gap-2 lg:gap-6">
              <h3 className="text-lg lg:text-3xl font-semibold text-[#E61717]">
                ขนย้ายเครื่องจักร ขนย้ายเฟอร์นิเจอร์ รับจ้างย้ายของ ไว้ใจเรา
              </h3>
              <p className="text-slate-700 text-sm lg:text-base">
                รับขนของย้ายบ้านทุกวัน ไม่เว้นวันหยุดนักขัตฤกษ์
                ขอคำปรึกษาและประเมินราคาได้ตลอด 24 ชั่วโมง
              </p>
              <div className="flex flex-col gap-4">
                <label htmlFor="" className="lg:text-base text-sm">
                  ติดต่อเรา
                </label>
                <div className="flex gap-2 lg:gap-4">
                  <a
                    href="tel:065-056-4598"
                    className=" px-4 py-2 rounded-full text-white bg-[#E61717] lg:text-base text-sm flex items-center gap-2"
                  >
                    <BsFillTelephoneFill />
                    <span>065-056-4598</span>
                  </a>
                  <a
                    href="tel:083-295-5924"
                    className=" px-4 py-2 rounded-full text-white bg-[#E61717] lg:text-base text-sm flex items-center gap-2"
                  >
                    <BsFillTelephoneFill />
                    <span>083-295-5924</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6 hidden lg:block">
            <Image
              src="/img/home_contact.png"
              width={1000}
              height={1000}
              alt="contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
