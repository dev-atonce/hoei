"use client";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import ServiceForm from "@/components/webpanel/Service/ServiceForm";
import { FetchContext } from "@/contexts/FetchContext";
import { url } from "inspector";

// export const metadata: Metadata = {
//   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

export default function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;
  interface serviceState {
    serviceNameTH: string;
    serviceNameEN: string;
    serviceDescriptionTH: string;
    serviceDescriptionEN: string;
    serviceDetailTH: string;
    serviceDetailEN: string;
    serviceUrl: string;
    image: string;
    imageAlt: string;
    serviceSeo: {
      titleTH: string;
      titleEN: string;
      keywordTH: string;
      keywordEN: string;
      descriptionTH: string;
      descriptionEN: string;
    };
  }

  const { onSave, onFetchOne }: any = useContext(FetchContext);
  const [serviceState, setServiceState] = useState({} as any);
  // const apiUrl = `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/service/${id}`;

  const onSaveGeneral = () => {
    const modifiedState = { ...serviceState };

    delete modifiedState?.serviceSeo;
    delete modifiedState?.id;
    delete modifiedState?.createdAt;
    delete modifiedState?.updatedAt;
    delete modifiedState?.sort;
    delete modifiedState?.status;
    delete modifiedState?.originalTitleTH;
    delete modifiedState?.originalTitleEN;

    onSave(
      modifiedState,
      "PUT",
      id,

      "service",
      "update general Info"
    );
  };

  const onSaveSeo = () => {
    const modifiedState = { serviceSeo: { ...serviceState?.serviceSeo } };

    onSave(modifiedState, "PUT", id, "serviceSeo", "update SEO");
  };

  // Tracking Form Change
  const onChangeState = (e: any, field: string) => {
    setServiceState((prevState: any) => ({ ...prevState, [field]: e }));
  };
  const onChangeSeoState = (e: any, field: string) => {
    setServiceState((prevState: any) => ({
      ...prevState,
      serviceSeo: { ...prevState?.serviceSeo, [field]: e },
    }));
  };
  const envLangs = process.env.NEXT_PUBLIC_LANGUAGES;
  // @ts-ignore
  const languages = envLangs.split(",").map((i: any) => i.toUpperCase());

  async function fetchData() {
    const data = await onFetchOne("service", id);
    setServiceState({
      ...data,
      originalTitleEN: data?.serviceNameEN,
      originalTitleTH: data?.serviceNameTH,
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={
          serviceState?.originalTitleEN || serviceState?.originalTitleTH
        }
        prevPage={{ pageName: "Service", url: "/webpanel/service" }}
      />
      <ServiceForm
        languages={languages}
        onSaveGeneral={onSaveGeneral}
        serviceState={serviceState}
        onChangeState={onChangeState}
        id={id}
        onSaveSeo={onSaveSeo}
        onChangeSeoState={onChangeSeoState}
        editor={{
          editor: true,
          name:'serviceDetail',
          images:{
              getPath: `service/${id}`,
              uploadPath: `service/${id}`,
          }
      }}
      />
    </DefaultLayout>
  );
}
