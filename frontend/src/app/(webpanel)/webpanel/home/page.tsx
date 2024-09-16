"use client";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormGroup from "@/components/webpanel/FormGroup/FormGroup";
import { useState, useContext, useEffect, useCallback } from "react";
import { FetchContext } from "@/contexts/FetchContext";
import TextEditor from "@/components/TextEditor";

export default function EditHomePage() {
  const { onFetchOne, onSave }: any = useContext(FetchContext);
  const [logoState, setLogoState] = useState({ header: "", footer: "" });
  const [homeState, setHomeState] = useState({} as any);
  const [langState, setLangState] = useState(
    process.env.NEXT_PUBLIC_MAIN_LANGUAGE
  );
  const envLangs = process.env.NEXT_PUBLIC_LANGUAGES;
  // @ts-ignore
  const languages = envLangs.split(",").map((i: any) => i.toUpperCase());
  const onCreate = async (type: string, data: any, route: string) => {
    await onSave(
      data, // state
      "PUT", // method
      type, //header, footer, id
      route, // type route
      `Update ${route} Success`
    );
  };

  const onFetch = async () => {
    const data = await onFetchOne("logo", "all");
    // @ts-ignore
    setLogoState({
      header: data?.find((i: any) => i?.type == "header"),
      footer: data?.find((i: any) => i?.type == "footer"),
    });
  };

  const fetchData = useCallback(async () => {
    const data = await onFetchOne("home");
    setHomeState({ ...data });
  }, []);

  // Tracking Form Change
  const onChangeState = (e: any, field: string) => {
    setLogoState((prevState) => ({ ...prevState, [field]: e }));
  };
  const onChangeHomeState = (e: any, field: string) => {
    setHomeState((prevState: any) => ({ ...prevState, [field]: e }));
  };
  const onSaveGeneral = () => {
    const modifiedState = { ...homeState };
    modifiedState.type = "home";
    onSave(
      modifiedState, // state
      "PUT", // method
      null, //header, footer, id
      "home", // type route
      "update home"
    );
  };

  useEffect(() => {
    fetchData();
    onFetch();
  }, [fetchData]);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Home Page"
        prevPage={{ pageName: "Dashboard", url: "/webpanel" }}
      />
      <div className="grid grid-cols-1 gap-5">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-1">
              <FormGroup
                onSave={() => onCreate("header", logoState, "logo")}
                formLabel="Logo header"
                inputBox={[
                  {
                    label: "Header Logo",
                    state: logoState?.header,
                    setState: onChangeState,
                    keyProp: "image",
                    type: "image",
                  },
                ]}
              />
            </div>
            <div className="col-span-1">
              <FormGroup
                onSave={() => onCreate("footer", logoState, "logo")}
                formLabel="Logo footer"
                inputBox={[
                  {
                    label: "Footer Logo",
                    state: logoState?.footer,
                    setState: onChangeState,
                    keyProp: "image",
                    type: "image",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5">
        <div className="col-span-1">
          <div className="bg-white rounded-lg p-2 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h5 className="py-2 text-sm font-medium text-black dark:text-white">
              Home detail
            </h5>
            {languages?.map(
              (i: any, k: any) =>
                i?.toLowerCase() === langState && (
                  <TextEditor
                    key={k}
                    id={`aboutUs${i.toUpperCase()}`}
                    setState={onChangeHomeState}
                    state={homeState}
                    prop={homeState && `aboutUs${i.toUpperCase()}`}
                    placeholder="Detail"
                    editor={{
                      editor: true,
                      name: `aboutUs${i.toUpperCase()}`,
                      images: {
                        getPath: `home`,
                        uploadPath: `home`,
                      },
                    }}
                  />
                )
            )}
            <button
              type="button"
              onClick={onSaveGeneral}
              className="bg-primary hover:bg-opacity-90 text-white p-2 rounded-lg mt-4 w-full focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
