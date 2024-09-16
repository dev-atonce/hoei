"use client";
import { PageSettingContext } from "@/contexts/PageSettingContext";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  const [loadingState, setLoadingState] = useState("start");
  const { primaryColor, navMenuOpen, setNavMenuOpen }: any =
    useContext(PageSettingContext);

  useEffect(() => {
    setNavMenuOpen(false);
    setTimeout(() => {
      setLoadingState("fade");
    }, 600);
    setTimeout(() => {
      setLoadingState("stop");
    }, 1000);
  }, []);
  return (
    <>
      {/* {loadingState && ( */}
      <div
        className={`${loadingState === "start" ? "block " : loadingState === "fade" ? "opacity-0" : loadingState === "stop" ? "hidden" : ""} transition-all duration-800 bg-white fixed top-0 bottom-0 right-0 left-0 z-[1000]`}
      >
        <div className="absolute top-[40%] right-[50%] translate-x-[50%]">
          <ThreeDots
            height="100"
            width="80"
            color="#EE3E3E"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
      {/* )} */}
    </>
  );
}
