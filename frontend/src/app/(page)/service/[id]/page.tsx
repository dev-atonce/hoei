import Cover from "@/components/main/Cover/Cover";
import Loading from "@/components/main/Loading/Loading";
import ProductContent from "@/components/main/Product/ProductContent";
import { redirect } from "next/navigation";

const fetchService = async (id: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/page/service/${id}`,
    { cache: "no-store" }
  );
  const data = await res.json();

  return data;
};

export default async function ServicePage({ params: { id } }: any) {
  const data = await fetchService(id);
  if (data?.error) {
    redirect("/");
  }

  return (
    <>
      <Loading />
      <Cover
        pageName={data?.serviceNameTH}
        prevPage={{ pageName: "หน้าแรก", url: "/" }}
      />
      <div className="container mx-auto">
        <div className="">
          <ProductContent data={data} />
        </div>
      </div>
    </>
  );
}
