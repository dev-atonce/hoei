"use client";

import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useCallback, useContext, useEffect, useState } from "react";
import TableThree from "@/components/webpanel/Tables/TableThree";
import Link from "next/link";
import { FetchContext } from "@/contexts/FetchContext";
import AntPagination from "@/components/common/AntPagination/AntPagination";

export default function CoverPage() {
  const [dragState, setDragState] = useState(false);
  const { onFetchPage, onDelete }: any = useContext(FetchContext);
  const [data, setData] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    const data = await onFetchPage("banner", "all", pageState);
    setTotal(data?.total);
    setData(data?.rows);
  }, [onFetchPage, pageState]);

  const onDeleteItem = async (id: number) => {
    try {
      const res = await onDelete(id, "banner", "Delete Project");
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
        pageName="Banner"
        prevPage={{ pageName: "Dashboard", url: "/webpanel" }}
      />
      <>
        <div className="flex justify-end item-center py-1">
          <div className="flex items-center gap-1">
            {/* <button
              onClick={() => setDragState(!dragState)}
              className={`${!dragState ? "border-yellow-400 text-yellow-600" : "border-green-400 text-green-600"} bg-white border-2 px-6 py-1 rounded-lg font-bold transition-all duration-700`}
            >
              {!dragState ? "SORT" : "DONE"}
            </button> */}
            <Link
              href="/webpanel/cover/create"
              className={`bg-white text-primary border-primary border-2 px-6 py-1 rounded-lg font-bold transition-all duration-700`}
            >
              CREATE
            </Link>
          </div>
        </div>
        <TableThree
          currentPage={pageState}
          onDelete={onDeleteItem}
          drag={dragState}
          type="banner"
          data={data}
          setData={setData}
          col={[
            { title: "Banner", minWidth: "" },
            { title: "Name/Link", minWidth: "" },
            { title: "Created On", minWidth: "" },
            { title: "Actions", minWidth: "" },
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
