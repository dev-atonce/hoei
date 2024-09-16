"use client";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useCallback, useContext, useEffect, useState } from "react";
import TableThree from "@/components/webpanel/Tables/TableThree";
import { FetchContext } from "@/contexts/FetchContext";
import AntPagination from "@/components/common/AntPagination/AntPagination";

export default function ProjectPage() {
  const { onFetchPage, onDelete }: any = useContext(FetchContext);
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    const data = await onFetchPage("contactForm", "all", pageState);
    setTotal(data?.total);
    setData(data?.rows);
  }, [onFetchPage, pageState]);

  const onDeleteItem = async (id: number) => {
    try {
      const res = await onDelete(id, "contact-form", "Delete Contact Form");
      if (res.success) {
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Contact Forms"
        prevPage={{ pageName: "Dashboard", url: "/webpanel" }}
      />
      <>
        <TableThree
          currentPage={pageState}
          onDelete={onDeleteItem}
          type="contact-form"
          data={data}
          setData={setData}
          col={[
            { title: "Email", minWidth: "" },
            { title: "Contact name", minWidth: "" },
            { title: "Telephone", minWidth: "" },
            { title: "Detail", minWidth: "180px" },
            { title: "Date", minWidth: "" },
            { title: "Status", minWidth: "" },
          ]}
        />
        {total > Number(process.env.NEXT_PUBLIC_PERPAGE) && (
          <AntPagination
            total={total}
            currentPage={pageState}
            setCurrentPage={setPageState}
            pageSize={Number(process.env.NEXT_PUBLIC_PERPAGE)}
          />
        )}
      </>
    </DefaultLayout>
  );
}
