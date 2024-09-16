import { Row } from "antd";
import ContactCard from "./Card";

export default function Contact({ data }: any) {
  const imgs = [
    {
      thumbnail: "/branch/branch_0.png",
      branch: "สาขาชลบุรี",
      telephone: "โทร. 033-048-248",
    },
    {
      thumbnail: "/branch/branch_1.png",
      branch: "สาขาบ่อวิน",
      telephone: "โทร. 038-959-343",
    },
    {
      thumbnail: "/branch/branch_2.png",
      branch: "สาขามาบตาพุด",
      telephone: "โทร. 033-017-791",
    },
    {
      thumbnail: "/branch/branch_3.png",
      branch: "สาขาสมุทรปราการ",
      telephone: "โทร. 02-136-7104",
    },
    {
      thumbnail: "/branch/branch_4.png",
      branch: "สาขารังสิต",
      telephone: "โทร. 02-090-2623",
    },
    {
      thumbnail: "/branch/branch_5.png",
      branch: "สาขาสมุทรสาคร",
      telephone: "โทร. 034-861-020",
    },
    {
      thumbnail: "/branch/branch_6.png",
      branch: "สำนักงานใหญ่",
      telephone: "โทร. 02-0177200",
    },
    {
      thumbnail: "/branch/branch_7.png",
      branch: "บริษัท เร้นท์ เทรด แอนด์ เซอร์วิส",
      telephone: "โทร. 02-017-7217",
    },
  ];

  const initList = data?.map((i: any, key: any) => ({
    ...i,
    thumbnail: imgs[key]?.thumbnail,
  }));

  const list = [
    ...initList,
    {
      thumbnail: "/branch/branch_7.png",
      nameTH: "บริษัท เร้นท์ เทรด แอนด์ เซอร์วิส",
      tel: "02-017-7217",
      id: "rts",
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-semibold py-6 text-[#0EA3DC]">
        สาขาในประเทศ
      </h3>
      <Row gutter={[16, 16]}>
        {/* @ts-ignore */}
        <ContactCard data={list}></ContactCard>
      </Row>
    </div>
  );
}
