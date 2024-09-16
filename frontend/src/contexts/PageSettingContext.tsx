"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  use,
} from "react";

// import axios from "axios";

// const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/page-setting`;
export const PageSettingContext = createContext({});
const primaryColor = "#0EA1DB";

export default function PageSettingProvider({
  children,
  pageSetting,
  lng,
}: any) {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  // const [pageSettingWebpanel, setPageSettingWebpanel] = useState([]);
  //   updating page setting
  // const updatePageSetting = async (updatingField: any, newValue: any) => {
  //   const response = await axios.put(URL, {
  //     updatingField: updatingField,
  //     newValue: newValue,
  //   });

  //   //
  // };

  // const pageSettingFetch = async () => {
  //   const response = await axios.get(URL);
  //   const data = response.data;
  //   setPageSettingWebpanel(data?.pageSetting);
  // };
  // useEffect(() => {
  //   pageSettingFetch();
  // }, []);

  //   const pageSettingCon = { pageSetting, updatePageSetting, testContext };
  return (
    <PageSettingContext.Provider
      value={{ primaryColor, navMenuOpen, setNavMenuOpen }}
    >
      {children}
    </PageSettingContext.Provider>
  );
}
