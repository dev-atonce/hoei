"use client";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import TableThree from "@/components/webpanel/Tables/TableThree";
import { LogInContext } from "@/contexts/LogInContext";
import { FetchContext } from "@/contexts/FetchContext";

export default function UserPage() {
  const { onFetchOne }: any = useContext(FetchContext);
  const { user, noAuth }: any = useContext(LogInContext);
  const [data, setData] = useState([]);

  const initialModalState = {};
  const [modalState, setModalState] = useState(initialModalState);

  async function fetchData() {
    const data = await onFetchOne("log", null);
    setData(data?.rows);
  }

  useEffect(() => {
    user?.role != "user" ? fetchData() : noAuth();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Activity Log"
        prevPage={{ pageName: "Settings", url: null }}
      />
      <>
        <TableThree
          type="log"
          modal={{ modalState, setModalState }}
          data={data}
          col={[
            { title: "Time", minWidth: "" },
            { title: "Activity", minWidth: "" },
            { title: "Module", minWidth: "" },
            { title: "User", minWidth: "" },
          ]}
        />
      </>
    </DefaultLayout>
  );
}
