import Image from "next/image";
import Link from "next/link";
export default function ProductCard({ item }: any) {
  return (
    <a
      href={`/service/${item?.id}`}
      className="group   pb-4 transition-all duration-500 col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 rounded-lg overflow-hidden"
    >
      <Image
        src={
          item?.image
            ? `${process.env.NEXT_PUBLIC_BASE_URL}${item?.image}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}public\\image\\no_image.webp`
        }
        alt={item?.nameTH}
        width={400}
        height={400}
        className="w-full object-cover aspect-[3/2] group-hover:brightness-105 transition-all"
        loading="lazy"
      />
      <div className="px-4 group-hover:text-[#E61717] pt-2 text-start text-lg transition-all">
        {item?.serviceNameTH}
      </div>
    </a>
  );
}
