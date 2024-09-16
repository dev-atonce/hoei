"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import LogInProvider from "@/contexts/LogInContext";
import { useRouter } from "next/navigation";
import FetchProvider from "@/contexts/FetchContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const localToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("userData");
    // @ts-ignore
    setToken(localToken);
    // @ts-ignore
    setUser(JSON.parse(user));
    (!localToken || !user) && router.push("/webpanel/auth/signin");
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Webpanel</title>
        <meta name="keywords" content={"Webpanel Keywords"} />
        <meta name="description" content={"Webpanel Description"} />
        <base href="/" />
      </head>

      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <FetchProvider user={user} token={token}>
            <LogInProvider
              user={user}
              setUser={setUser}
              token={token}
              setToken={setToken}
            >
              {loading ? <Loader /> : children}
            </LogInProvider>
          </FetchProvider>
        </div>
      </body>
    </html>
  );
}
