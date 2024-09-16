import ProductCard from "../ProductCard/ProductCard";

const fetchData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/service`,
    { cache: "no-store" }
  );

  const result = await res.json();
  return result.rows;
};

export default async function ServiceSection({ data }: any) {
  const services = await fetchData();
  const mocks = [
    {
      serviceNameTh: "บริการขนย้ายบ้าน คอนโด อพาร์ทเม้นท์ หอพัก",
    },
    {
      serviceNameTh: "บริการขนย้ายสำนักงาน โรงงาน เครื่องจักร",
    },
    {
      serviceNameTh: "บริการขนย้ายเฟอร์นิเจอร์ สินค้า บูธงานแสดงสินค้า",
    },
    {
      serviceNameTh:
        "บริการถอดติดตั้ง เฟอร์นิเจอร์ น็อคดาวน์และเฟอร์นิเจอร์บิวท์อิน",
    },
    {
      serviceNameTh:
        "บริการรื้อติดตั้งชั้นวางสินค้าอุตสาหกรรม Rack รื้อถอนคืนพื้นที่",
    },
    {
      serviceNameTh: "บริการแรงงาน เคลื่อน ย้ายของ ขนของ",
    },
    {
      serviceNameTh: "บริการรับฝากสินค้า และ เฟอร์นิเจอร์ เก็บในโกดัง",
    },
    {
      serviceNameTh: "บริการอื่นๆ",
    },
  ];
  return (
    <div className="">
      <div className="grid grid-cols-12 gap-4">
        {services?.map((i: any, k: any) => <ProductCard item={i} key={k} />)}
      </div>
    </div>
  );
}
