import Image from "next/image";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
export default function Cover({ pageName, prevPage }: any) {
  return (
    <div className="w-full pb-4 lg:pb-0 ">
      <div className="relative bg-green-200">
        <Image
          className="w-full  shadow-sm "
          src="/img/cover_page.png"
          width={2000}
          height={500}
          quality={80}
          alt="cover"
          priority={true}
        />
        <div className="absolute top-4 xl:top-14 left-[50%] translate-x-[-50%] flex flex-col items-center text-white">
          <h1 className=" text-xl lg:text-4xl font-semibold ">{pageName}</h1>
          <p className="text-xl hidden lg:block">
            สปีดมูฟ บริษัทขนย้ายของ ยกระดับการขนย้ายโดยทีมงานคุณภาพ
          </p>
          <p className=" hidden lg:block">
            บริษัทขนย้ายของ รับขนย้ายของทุกชนิด เล็กใหญ่ ใกล้ไกล
            เราพร้อมให้บริการ
          </p>
        </div>
      </div>
      <div className="container mx-auto ">
        <div className=" py-4 hidden md:block">
          <Breadcrumb pageName={pageName} prevPage={prevPage} />
        </div>
      </div>
    </div>
  );
}
