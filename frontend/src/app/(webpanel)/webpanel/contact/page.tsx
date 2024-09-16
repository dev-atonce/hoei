"use client";

import Breadcrumb from "@/components/webpanel/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormGroup from "@/components/webpanel/FormGroup/FormGroup";
import { useContext, useEffect, useState } from "react";
import TableThree from "@/components/webpanel/Tables/TableThree";
import { FetchContext } from "@/contexts/FetchContext";
import Link from "next/link";

export default function EditContactPage() {
  const [addressDragState, setAddressDragState] = useState(false);
  const [subjectDragState, setSubjectDragState] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const { onFetchOne, onDelete }: any = useContext(FetchContext);

  const fetchData = async () => {
    const addressData = await onFetchOne("address", null);
    setAddressList(addressData?.rows);

    const subjectData = await onFetchOne("subject", null);
    setSubjectList(subjectData?.rows);
  };

  const envLangs = process.env.NEXT_PUBLIC_LANGUAGES;
  //   @ts-ignore
  const languages = envLangs.split(",").map((i: any) => i.toUpperCase());

  const onDeleteItem = async (id: any, type: any) => {
    if (type == "subject") {
      try {
        const res = await onDelete(id, type, "Delete Subject");
        if (res.success) {
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    } else if (type == "address") {
      try {
        const res = await onDelete(id, type, "Delete Address");
        if (res.success) {
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Contact Information"
        prevPage={{ pageName: "Dashboard", url: "/webpanel" }}
      />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <FormGroup
            // onSave={onSave}
            formLabel="Home Page Content"
            inputBox={[
              {
                label: "Header",
                placeHolder: "Page Header",
                // state: homePageState,
                // setState: onChangeState,
                keyProp: "header",
                type: "input",
                languages: languages,
              },

              {
                label: "Sub-Header",
                placeHolder: "Page Sub-Header",
                // state: homePageState,
                // setState: onChangeState,
                keyProp: "subHeader",
                type: "input",
                languages: languages,
              },
              {
                label: "Description",
                placeHolder: "Your Page Description",
                // state: homePageState,
                // setState: onChangeState,
                keyProp: "description",
                type: "textArea",
                rows: 6,
                languages: languages,
              },
              {
                label: "Footer Description",
                placeHolder: "Your Footer Description",
                // state: homePageState,
                // setState: onChangeState,
                keyProp: "footerDescription",
                type: "textArea",
                rows: 6,
                languages: languages,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-9">
          <div className="">
            <div className="flex justify-between">
              <h4 className=" text-xl">Inquiry Box</h4>
            </div>
            <div className="max-h-[50vh] overflow-y-scroll">
              <TableThree
                drag={addressDragState}
                setData={setAddressList}
                type="address"
                data={addressList}
                col={[
                  { title: "Name", minWidth: "" },
                  { title: "Date", minWidth: "" },
                  { title: "Action", minWidth: "" },
                ]}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <h4 className=" text-xl">Contact Subjects</h4>
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => setSubjectDragState(!subjectDragState)}
                  className={`${!subjectDragState ? "border-yellow-400 text-yellow-600" : "border-green-400 text-green-600"} bg-white border-2 px-6 py-1 rounded-lg font-bold transition-all duration-700`}
                >
                  {!subjectDragState ? "SORT" : "DONE"}
                </button>

                <Link
                  href="contact/subject/create"
                  className={`bg-white text-primary border-primary border-2 px-6 py-1 rounded-lg font-bold transition-all duration-700`}
                >
                  CREATE SUBJECT
                </Link>
              </div>
            </div>
            <TableThree
              onDelete={onDeleteItem}
              drag={subjectDragState}
              type="subject"
              data={subjectList}
              setData={setSubjectList}
              col={[
                { title: "Subject", minWidth: "" },
                { title: "E-mail", minWidth: "" },
                { title: "Action", minWidth: "" },
              ]}
            />
          </div>
          <div className="">
            <div className="flex justify-between">
              <h4 className=" text-xl">Addresses</h4>
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => setAddressDragState(!addressDragState)}
                  className={`${!addressDragState ? "border-yellow-400 text-yellow-600" : "border-green-400 text-green-600"} bg-white border-2 px-6 py-1 rounded-lg font-bold transition-all duration-700`}
                >
                  {!addressDragState ? "SORT" : "DONE"}
                </button>

                <Link
                  href="contact/create"
                  className={`bg-white text-primary border-primary border-2 px-6 py-1 rounded-lg font-bold transition-all duration-700`}
                >
                  CREATE ADDRESS
                </Link>
              </div>
            </div>
            <TableThree
              onDelete={onDeleteItem}
              drag={addressDragState}
              setData={setAddressList}
              type="address"
              data={addressList}
              col={[
                { title: "Branch", minWidth: "" },
                { title: "Action", minWidth: "" },
              ]}
            />
          </div>
          {/* Color Form */}

          {/* <!-- Sign Up Form --> */}
        </div>
      </div>
    </DefaultLayout>
  );
}
