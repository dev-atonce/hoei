"use client";
import React, { useContext, useEffect, useRef, useState } from "react";

import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

import UserForm from "@/components/webpanel/User/UserForm";
import { LogInContext } from "@/contexts/LogInContext";

const SignUp: React.FC = () => {
  const { user, onLogOut, noAuth }: any = useContext(LogInContext);

  useEffect(() => {
    user?.role == "user" && noAuth();
  }, []);
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Create New User"
        prevPage={{ pageName: "Users", url: "/webpanel/settings/user" }}
      />

      <UserForm type="create" />
    </DefaultLayout>
  );
};

export default SignUp;
