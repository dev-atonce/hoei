"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TextEditor from "@/components/TextEditor";
import { FetchContext } from "@/contexts/FetchContext";
import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";

export default function AboutPage() {
  const [aboutState, setAboutState] = useState({} as any);
  const [langState, setLangState] = useState(
    process.env.NEXT_PUBLIC_MAIN_LANGUAGE
  );
  const envLangs = process.env.NEXT_PUBLIC_LANGUAGES;
  const { onSave, onFetchOne }: any = useContext(FetchContext);
  // @ts-ignore
  const languages = envLangs.split(",").map((i: any) => i.toUpperCase());

  const fetchData = useCallback(async () => {
    const data = await onFetchOne("about-us");
    setAboutState({ ...data });
  }, []);

  const onChangeState = (e: any, field: string) => {
    setAboutState((prevState: any) => ({ ...prevState, [field]: e }));
  };

  const onSaveGeneral = () => {
    const modifiedState = { ...aboutState };
    modifiedState.type = "about-us";

    // console.log(modifiedState)
    onSave(modifiedState, "PUT", null, "about-us", "update about-us");
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="About Us"
        prevPage={{ pageName: "Dash board", url: "/webpanel" }}
        // prevPage={{ pageName: "About Us", url: "/webpanel/about-us" }}
      />
      <div className="grid grid-cols-1 gap-y-9 sm:grid-cols-1 ">
        <div className="col-span-2">
          <div className="bg-white rounded-lg p-2">
            <div className="col-span-2">
              <div className="bg-white rounded-lg p-2">
                <h5 className="text-bold">Detail</h5>
                {languages?.map(
                  (i: any, k: any) =>
                    i?.toLowerCase() === langState && (
                      <TextEditor
                        key={k}
                        id={`aboutUs${i.toUpperCase()}`}
                        setState={onChangeState}
                        state={aboutState}
                        prop={aboutState && `aboutUs${i.toUpperCase()}`}
                        placeholder="Detail"
                        editor={{
                          name: `aboutUs${i.toUpperCase()}`,
                          images: {
                            getPath: `about-us`,
                            uploadPath: `about-us`,
                          },
                        }}
                      />
                    )
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onSaveGeneral}
            className="bg-blue-500 text-white p-2 rounded-lg mt-4 w-full focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}
