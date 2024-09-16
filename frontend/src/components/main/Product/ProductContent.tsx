import DynamicContent from "../DynamicContent/DynamicContent";
// import Image from "next/image";
import { Image } from "antd";

export default function ProductContent({ data }: any) {
  return (
    <div className="w-full">
      <div className="py-4">
        <div className=" overflow-x-scroll rounded-xl  ">
          <DynamicContent content={data?.serviceDetailTH} />
        </div>
      </div>
    </div>
  );
}
