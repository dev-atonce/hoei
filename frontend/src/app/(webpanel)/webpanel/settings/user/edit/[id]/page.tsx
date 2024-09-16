"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserForm from "@/components/webpanel/User/UserForm";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import { useContext, useEffect, useState } from "react";
import { LogInContext } from "@/contexts/LogInContext";
import { FetchContext } from "@/contexts/FetchContext";

const EditUser = ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  const { user, noAuth }: any = useContext(LogInContext);
  const { onSave, onFetchOne }: any = useContext(FetchContext);

  const [userState, setUserState] = useState({});

  async function fetchData() {
    const data = await onFetchOne("user", id);
    setUserState({ ...data, initName: data?.username });
  }

  useEffect(() => {
    user?.role == "user" && user?.id != id ? noAuth() : fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb
        // @ts-ignore
        pageName={`Edit User: ${userState?.initName}`}
        prevPage={{ pageName: "Users", url: "/webpanel/settings/user" }}
      />

      <UserForm type="edit" data={userState} setData={setUserState} />
    </DefaultLayout>
  );
};

export default EditUser;
