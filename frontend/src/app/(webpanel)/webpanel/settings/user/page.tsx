"use client";

import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useContext, useEffect, useState } from "react";
import TableThree from "@/components/webpanel/Tables/TableThree";
import Link from "next/link";
import { LogInContext } from "@/contexts/LogInContext";
import { FetchContext } from "@/contexts/FetchContext";

export default function UserPage() {
  const { onFetchOne, onDelete }: any = useContext(FetchContext);
  const { user, noAuth }: any = useContext(LogInContext);
  //   @ts-ignore
  const [data, setData] = useState([]);

  const initialModalState = {};
  const [modalState, setModalState] = useState(initialModalState);

  async function fetchData() {
    const data = await onFetchOne("user", null);
    setData(data?.rows);
  }

  const onDeleteItem = async (id: any) => {
    try {
      const res = await onDelete(id, "user", "Delete User");
      if (res.success) {
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user?.role != "user" ? fetchData() : noAuth();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="User Settings"
        prevPage={{ pageName: "Settings", url: null }}
      />

      <>
        <div className="flex items-cente justify-end gap-1 mb-2">
          <Link
            href="user/create"
            className={`bg-white text-primary border-primary border-2 px-6 py-1 rounded-lg font-bold transition-all duration-700`}
          >
            CREATE NEW USER
          </Link>
        </div>

        <TableThree
          onDelete={onDeleteItem}
          type="user"
          modal={{ modalState, setModalState }}
          data={data}
          col={[
            { title: "Name", minWidth: "" },

            { title: "E-Mail", minWidth: "" },
            { title: "Created On", minWidth: "" },
            { title: "Action", minWidth: "" },
          ]}
        />
      </>
    </DefaultLayout>
  );
}
