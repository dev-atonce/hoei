"use client";

import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import { FetchContext } from "@/contexts/FetchContext";
import CoverForm from "@/components/webpanel/CoverForm/CoverForm";

export default function CreateCoverPage() {
  const { onSave }: any = useContext(FetchContext);

  const [serviceState, setServiceState] = useState({} as any);

  const onCreate = () => {
    onSave(
      serviceState,
      "POST",
      null,
      "banner",
      `Create New Banner:${serviceState?.title}`
    );
  };
  // Tracking Form Change
  const onChangeState = (e: any, field: string) => {
    setServiceState((prevState: any) => ({ ...prevState, [field]: e }));
  };

  const envLangs = process.env.NEXT_PUBLIC_LANGUAGES;
  // @ts-ignore
  const languages = envLangs.split(",").map((i: any) => i.toUpperCase());

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={"Create Banner"}
        prevPage={{ pageName: "Banner", url: "/webpanel/cover" }}
      />

      <CoverForm
        languages={languages}
        onSaveGeneral={onCreate}
        serviceState={serviceState}
        onChangeState={onChangeState}
        onSaveSeo={onCreate}
        onChangeSeoState={onChangeState}
      />
    </DefaultLayout>
  );
}
