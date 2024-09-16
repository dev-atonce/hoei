import { Card, Col } from "antd";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  data: any[];
  type: any;
}

export default function ContactCard({ data, type }: BlogCardProps) {
  return data?.map((item: any, key: any) => {
    return (
      <Col xs={24} sm={12} md={12} lg={12} xl={6} key={key}>
        <Link href={`/contact/branch/${item?.id}`}>
          <Card
            className="group"
            hoverable
            cover={
              <Image
                className="w-full aspect-[4/2] object-cover"
                alt={item?.branch}
                src={item?.thumbnail}
                width={311}
                height={188}
                quality={100}
                loading="lazy"
              />
            }
          >
            <div className={`min-h-[60px]`}>
              <h3
                className={`line-clamp-1 font-bold text-slate-700 text-lg group-hover:text-[#0EA3DC]`}
              >
                {item?.nameTH}
              </h3>
              <p className="line-clamp-2 h-11 text-slate-600 text-lg group-hover:text-[#FA5604]">
                โทร: {item?.tel}
              </p>
            </div>
          </Card>
        </Link>
      </Col>
    );
  });
}
