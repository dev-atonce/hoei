"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FetchContext } from "./FetchContext";

export const LogInContext = createContext({});

export default function LogInProvider({
  children,
  token,
  setToken,
  user,
  setUser,
}: any) {
  const { onInsertLog }: any = useContext(FetchContext);
  const router = useRouter();

  const apiUrl = `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/webpanel/users/login`;

  const onLogIn = async (formData: any) => {
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await response.json();

      if (res?.error) {
        let msg = "Log In Failed";
        if (res?.error?.message == "password is invalid.") {
          msg = "Invalid Password";
        } else if (res?.error?.message == "email not found") {
          msg = "Email Not Found!";
        }
        Swal.fire({
          toast: true,
          position: "top",
          icon: "error",
          title: msg,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        localStorage.setItem("accessToken", res?.accessToken);
        localStorage.setItem("userData", JSON.stringify(res?.userData));
        setToken(res?.accessToken);
        setUser(res?.userData);
        onInsertLog(
          res?.userData?.id,
          res?.userData?.id,
          "user",
          `${res?.userData?.username} Log In`
        );
        Swal.fire({
          toast: true,
          position: "top",
          icon: "success",
          title: "Welcome Back!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          router.push("/webpanel/");
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onLogOut = (type:any) => {
    onInsertLog(user?.id, user?.id, "user", `${user?.username} Log Out`);
    setUser({});
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
   if ( type == 'manual') {

     Swal.fire({
      toast: true,
      position: "top",
      icon: "success",
      title: "Logged Out Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    }
    setTimeout(() => {
      router.push("/webpanel/auth/signin");
    }, 1500);
  };

  const onCheckAuth = async () => {
    let route = `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/webpanel/users/check-auth`;

    try {
      const response = await fetch(route, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;

      // console.log("Data received:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      Swal.fire({
        position: "top-right",
        toast: true,
        icon: "warning",
        title: "Session Timeout, Log In Again!",
        showConfirmButton: false,
        timer: 2500,
      });
      onLogOut('auto');
      setTimeout(() => {
        router.push("/webpanel/auth/signin");
      }, 2500);
    }
  };

  const noAuth = () => {
    router.push("/webpanel");
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const token = localStorage.getItem("accessToken");
  }, []);

  return (
    <LogInContext.Provider
      value={{ user, onLogOut, noAuth, onLogIn, onCheckAuth }}
    >
      {children}
    </LogInContext.Provider>
  );
}
