import Link from "next/link";
import Image from "next/image";
import { FaAngleDoubleRight } from "react-icons/fa";

export default function TrainingBanner() {
  function getRandomNumber() {
    return Math.floor(Math.random() * 7) + 1;
  }

  return (
    <div className="bg-slate-300 pb-14 pt-20 relative shadow-md">
      <div className="absolute top-0 right-0 bottom-0 left-0 ">
        <Image
          src={`/img/safety_banner_${getRandomNumber()}.jpg`}
          alt="banner"
          width={2000}
          height={500}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/90"></div>
      </div>
      <div className="container mx-auto flex flex-col items-center gap-10 relative">
        <div className="flex flex-col items-center gap-4">
          <h5
            className="text-2xl font-semibold text-slate-600"
            style={{ textShadow: "white 1px 1px 1px" }}
          >
            การฝึกอบรมความปลอดภัยในการใช้เครื่องจักร
          </h5>
          <h5
            className="text-2xl font-semibold text-red"
            style={{ textShadow: "white 1px 1px 1px" }}
          >
            Safety Training for Machine
          </h5>
        </div>
        <Link
          href="/other-service/training"
          className=" px-4 py-2 rounded-full text-white bg-[#0DA1DB] "
        >
          ดูรายละเอียด
        </Link>
      </div>
      ;
    </div>
  );
}
