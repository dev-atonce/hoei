import Link from "next/link";
import Image from "next/image";
import "../../../css/Custom.scss";

export function Logo({ color, img }: any) {

  return (
    <div className="">
      <Link href="/" className="_links">
        {img && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${img}`}
            alt="rent"
            width={300}
            height={400}
          />
        )}
      </Link>
    </div>
  );
}
