"use client";

import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormGroup from "@/components/webpanel/FormGroup/FormGroup";
import { useContext, useEffect, useState } from "react";
import TableThree from "@/components/webpanel/Tables/TableThree";
import Modal from "@/components/webpanel/Modal/Modal";
import Jodit from "@/components/webpanel/Editor/Jodit";
import { FetchContext } from "@/contexts/FetchContext";

export default function SeoSettingPage() {
  const { onFetchOne }: any = useContext(FetchContext);
  const [data, setData] = useState([]);
  const envLangs: string | undefined = process.env.NEXT_PUBLIC_LANGUAGES;

  // @ts-ignore
  const languages: undefined | string[] = envLangs
    .split(",")
    .map((i: any) => i.toUpperCase());

  const initialModalState = {};
  const [modalState, setModalState] = useState(initialModalState);

  async function fetchData() {
    const data = await onFetchOne("seo", null);
    setData(data?.rows);
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [modalState]);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="SEO Settings"
        prevPage={{ pageName: "Settings", url: null }}
      />

      <>
        <TableThree
          type="seo"
          modal={{ modalState, setModalState }}
          data={data}
          col={[
            { title: "Page/Title", minWidth: "" },
            { title: "Description", minWidth: "" },
            { title: "Keywords", minWidth: "" },
            { title: "Action", minWidth: "" },
          ]}
        />
      </>
      {/* <Jodit /> */}

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3 ">
        {data?.map((i: any, key: number) => (
          <Modal
            key={key}
            languages={languages}
            type="seo"
            // @ts-ignore
            show={modalState[i?.id]}
            id={i?.id}
            data={i}
            setShow={setModalState}
          />
        ))}
      </div>
    </DefaultLayout>
  );
}
