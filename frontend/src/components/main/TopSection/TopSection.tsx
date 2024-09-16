import Image from "next/image";
export default function TopSecton() {
  return (
    <div className=" py-6 mb-6 border-b border-slate-400 grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-6 xl:col-span-4">
        <Image
          src="/img/topImage.png"
          width="500"
          height="500"
          alt="trucks"
          className="rounded-lg"
        />
      </div>
      <div className="col-span-12 lg:col-span-6 xl:col-span-8 flex gap-4 flex-col items-start">
        <p className="bg-[#E61717] text-white p-2 inline rounded">SPEEDMOVE</p>

        <h2 className="text-2xl">
          บริการรับขนของย้ายบ้าน ทุกประเภทโดยทีมงานมืออาชีพ
        </h2>
        <p>
          รับขนของย้ายบ้านทุกวัน ไม่เว้นวันหยุดนักขัตฤกษ์
          ขอคำปรึกษาและประเมินราคาได้ตลอด 24 ชั่วโมง
        </p>
      </div>
    </div>
  );
}
