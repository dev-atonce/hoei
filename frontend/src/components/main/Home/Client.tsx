import Image from "next/image";
export default function Client({ data }: any) {
  return (
    <div className="mt-6 sm:mt-14 pt-6 sm:pb-14 sm:pt-20 relative project border-b border-1 border-slate-300">
      <h2 className="text-2xl font-semibold text-slate-800">
        ลูกค้าส่วนหนึ่งของเรา
      </h2>
      <div className="grid grid-cols-12 gap-4 py-4">
        {data?.map((i: any, k: any) => (
          <div
            key={k}
            className="group pb-4 transition-all duration-500 col-span-4 lg:col-span-2 rounded-lg overflow-hidden"
          >
            <Image
              src={
                i?.image
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}${i?.image}`
                  : `${process.env.NEXT_PUBLIC_BASE_URL}public\\image\\no_image.webp`
              }
              alt={i?.nameTH}
              width={400}
              height={400}
              className="w-full object-cover aspect-[4/2] group-hover:brightness-105 transition-all"
              loading="lazy"
            />
            <div className="px-4 group-hover:text-[#E61717] pt-2 text-start text-lg transition-all">
              {i?.serviceNameTH}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
