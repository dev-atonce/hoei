"use client";

import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
// import ServiceForm from "@/components/webpanel/Service/ServiceForm";
import { useRouter } from "next/navigation";
import { FetchContext } from "@/contexts/FetchContext";
import ClientForm from "@/components/webpanel/ClientForm/page";

export default function CreateServicePage() {
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
  const { onSave }: any = useContext(FetchContext);

  const [serviceState, setServiceState] = useState({} as any);

  const onCreate = () => {
    
    onSave(
      serviceState,
      "POST",
      null,
      "client",
      `Create New Client:${serviceState?.title}`
    );
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

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={"Create New Client"}
        prevPage={{ pageName: "Client", url: "/webpanel/client" }}
      />
      <ClientForm
        languages={languages}
        onSaveGeneral={onCreate}
        serviceState={serviceState}
        onChangeState={onChangeState}
        onSaveSeo={onCreate}
        onChangeSeoState={onChangeSeoState}
      />
    </DefaultLayout>
  );
}
