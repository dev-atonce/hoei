"use client";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import ServiceForm from "@/components/webpanel/Service/ServiceForm";
import { FetchContext } from "@/contexts/FetchContext";
import CoverForm from "@/components/webpanel/CoverForm/CoverForm";

// export const metadata: Metadata = {
//   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

export default function EditCoverPage({ params }: { params: { id: string } }) {
  const id = params?.id;

  const { onSave, onFetchOne, onDeleteGallery }: any = useContext(FetchContext);
  const [serviceState, setServiceState] = useState({} as any);
  // const apiUrl = `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/service/${id}`;

  const onSaveGeneral = () => {
    const modifiedState = { ...serviceState };

    delete modifiedState?.id;
    delete modifiedState?.createdAt;
    delete modifiedState?.updatedAt;
    delete modifiedState?.sort;
    delete modifiedState?.status;
    delete modifiedState?.originalTitleTH;

    onSave(
      modifiedState,
      "PUT",
      id,

      "banner",
      "update banner"
    );
  };

  const onSaveSeo = () => {
    const modifiedState = { serviceSeo: { ...serviceState?.serviceSeo } };

    onSave(modifiedState, "PUT", id, "serviceSeo", "update SEO");
  };

  const onDeleteImageGallery = async (position: any) => {
    const res = await onDeleteGallery(
      id,
      "project",
      position,
      "Delete Project Gallery"
    );
    if (res?.success) {
      setServiceState((prevState: any) => ({
        ...prevState,
        _gallery: prevState._gallery.filter(
          (i: any, index: any) => index !== position
        ),
      }));
    }
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
    const data = await onFetchOne("banner", id);
    setServiceState({
      ...data,

      originalTitleTH: data?.title,
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={serviceState?.originalTitleTH}
        prevPage={{ pageName: "Banner", url: "/webpanel/cover" }}
      />

      <CoverForm
        languages={languages}
        onSaveGeneral={onSaveGeneral}
        serviceState={serviceState}
        onChangeState={onChangeState}
        id={id}
        onSaveSeo={onSaveSeo}
        onChangeSeoState={onChangeSeoState}
        onDeleteImageGallery={onDeleteImageGallery}
      />
    </DefaultLayout>
  );
}
