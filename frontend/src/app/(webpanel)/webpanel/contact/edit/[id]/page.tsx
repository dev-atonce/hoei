"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddressForm from "@/components/webpanel/AddressForm/AddressForm";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import { FetchContext } from "@/contexts/FetchContext";
import { useContext, useEffect, useState } from "react";

export default function AddressEdit({
  params: { id },
  // data,
}: any) {
  const [data, setData] = useState({});
  const { onFetchOne, onSave }: any = useContext(FetchContext);
  const envLangs = process.env.NEXT_PUBLIC_LANGUAGES;
  //   @ts-ignore
  const languages = envLangs.split(",").map((i: any) => i.toUpperCase());

  const onFetch = async () => {
    const data = await onFetchOne("address", id);

    setData({ ...data, initialName: data?.nameEN });
  };

  const onEdit = async () => {
    //   @ts-ignore
    onSave(data, "PUT", id, "address", `Edit Address ${data?.nameEN}`);
  };

  const onChangeState = (e: any, field: string) => {
    setData((prevState: any) => ({ ...prevState, [field]: e }));
  };

  useEffect(() => {
    onFetch();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb
        // @ts-ignore
        pageName={`Edit Address: ${data?.initialName}`}
        prevPage={{ pageName: `Contact`, url: "/webpanel/contact" }}
      />

      <AddressForm
        languages={languages}
        onSave={onEdit}
        data={data}
        onChangeState={onChangeState}
        id={id}
      />
    </DefaultLayout>
  );
}
