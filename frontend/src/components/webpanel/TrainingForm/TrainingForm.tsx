import { useContext, useEffect, useState } from "react";
import FormGroup from "../FormGroup/FormGroup";
import ImageComponent from "@/components/common/ImageComponent/ImageComponent";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { FetchContext } from "@/contexts/FetchContext";
import Jodit from "../Editor/Jodit";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import TableThree from "../Tables/TableThree";
import AntCollapse from "../AntCollapse/AntCollapse";
import type { CollapseProps } from "antd";
import DatePickerReact from "@/components/FormElements/DatePicker/DatePickerReact";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

export default function TrainingForm({
  data,
  onSave,
  languages,
  onChangeState,
  id,
  onSaveSeo,
  onChangeSeoState,
  mainCat,
  onDeleteImageGallery,
  tableData,
  onFetchCalendar,
  edit,
}: any) {
  const {
    onFetchOne,
    onDeleteGallery,
    onSave: onSaveData,
    onDelete,
  }: any = useContext(FetchContext);
  const [newCalendar, setNewCalendar] = useState({});

  const dateConverter = (fullDate: any) => {
    const date = new Date(fullDate);

    // Convert the date to the desired format (YYYY-MM-DD)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JavaScript
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  };

  const onSaveNewCalendar = async () => {
    const modifiedData = {
      ...newCalendar,
      // @ts-ignore
      start: newCalendar?.start ? dateConverter(newCalendar?.start) : null,
      // @ts-ignore
      end: newCalendar?.end ? dateConverter(newCalendar?.end) : null,
      trainingCourse: data?.id,
    };

    try {
      const res = await onSaveData(
        // @ts-ignore
        modifiedData,
        "POST",
        // @ts-ignore
        data?.id,
        "calendar",
        // @ts-ignore
        `New Calendar ${data?.title}`
      );
      if (res?.success) {
        onFetchCalendar();
        setNewCalendar({ title: "", start: null, end: null });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClearNewCalendar = async () => {
    setNewCalendar({ title: "", start: null, end: null });
  };

  const onDeleteCalendar = async (id: any) => {
    try {
      const res = await onDelete(id, "calendar", "delete calendar");
      if (res?.success) {
        onFetchCalendar();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "CREATE SCHEDULE",
      children: (
        <div className="flex justify-between items-center">
          <div className="py-5 pl-9 dark:border-strokedark  text-start flex flex-col">
            <label htmlFor="">Title</label>
            <input
              // @ts-ignore
              value={newCalendar?.title}
              onChange={(e: any) =>
                setNewCalendar((prevState: any) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              type="text"
              className="border border-slate-300 rounded-lg px-2"

              // @ts-ignore
              // value={editData?.title}
            />
          </div>
          <div className="   py-5 pl-9 dark:border-strokedark text-start">
            <label htmlFor="">Date</label>
            <DatePickerReact data={newCalendar} setData={setNewCalendar} />
          </div>

          <div className=" px-4 py-5 dark:border-strokedark">
            <div className="flex items-center gap-1">
              <button
                className="hover:text-white hover:bg-green-400 text-green-400 border-green-400 border p-2 rounded-full"
                onClick={onSaveNewCalendar}
              >
                <FaCheckCircle size={20} />
              </button>
              <button
                onClick={onClearNewCalendar}
                className="hover:text-white hover:bg-red text-red border-red border p-2 rounded-full"
              >
                <RiDeleteBinLine size={20} />
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-4 ">
          <FormGroup
            //   onSave={onSave}
            formLabel={"Training Course"}
            inputBox={[
              {
                label: "Course Title",
                placeHolder: "Course Title",
                state: data,
                setState: onChangeState,
                keyProp: "title",
                type: "input",
                languages: languages,
                required: true,
              },
              {
                label: "Price",
                placeHolder: "Course Title",
                state: data,
                setState: onChangeState,
                keyProp: "price",
                type: "input",

                required: false,
              },
              {
                label: "Duration",
                placeHolder: "Course Title",
                state: data,
                setState: onChangeState,
                keyProp: "duration",
                type: "input",
              },
              {
                label: "Place",
                placeHolder: "Course Title",
                state: data,
                setState: onChangeState,
                keyProp: "place",
                type: "input",
              },
              {
                label: "Time",
                placeHolder: "Course Title",
                state: data,
                setState: onChangeState,
                keyProp: "time",
                type: "input",
              },

              {
                label: "Image",
                placeHolder: "image",
                state: data,
                setState: onChangeState,
                keyProp: "image",
                type: "image",
                ratio: "3/2",
                required: true,
                height: "200px",
                multiple: false,
              },
              {
                label: "Image ALT",
                placeHolder: "alt",
                state: data,
                setState: onChangeState,
                keyProp: "imageAlt",
                type: "input",
                required: true,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-9 bg-white h-full rounded-xl p-4 overflow-y-scroll">
          <div className="flex flex-col gap-9">
            {edit && (
              <div>
                <div className="flex flex-col  py-4">
                  <h4 className=" text-xl">Calendar</h4>
                  <div className="w-full">
                    {/* <Link
                    href="product/maincat/create"
                    className={`bg-white text-primary border-primary border-2 px-6 py-1 rounded-lg font-bold transition-all duration-700`}
                    >
                    CREATE SCHEDULE
                    </Link> */}
                    {/* @ts-ignore */}
                    <AntCollapse items={items} />
                  </div>
                </div>
                {/* to do calendar fetch */}
                <div className="">
                  <TableThree
                    onFetchCalendar={onFetchCalendar}
                    onDelete={onDeleteCalendar}
                    //   drag={mainCatDragState}
                    type="calendar"
                    data={tableData}
                    //   setData={setMainCatData}
                    col={[
                      { title: "Title", minWidth: "" },
                      { title: "Schedule", minWidth: "" },
                      { title: "Action", minWidth: "" },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="w-full  sm:col-span-2 py-2 flex flex-col gap-y-2">
          <span>Gallery</span>
          <div className=" flex flex-wrap gap-2 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full py-2 px-6">
          {data?._gallery?.map((item: any, index: any) => (
            <div
            key={index}
            className="h-[200px] rounded-lg overflow-hidden relative"
            >
            <div
            onClick={() => onDeleteImageGallery(index)}
                  className="absolute top-2 right-2 p-2 bg-red rounded-full hover:cursor-pointer text-white"
                >
                  <MdDeleteForever size={20} />
                </div>
                <Image
                  src={"/img/about_1.png"}
                  alt="gallery"
                  width="400"
                  height="400"
                  className="h-full w-full object-cover aspect-[3/2]"
                />
              </div>
            ))}
          </div>
          <FormGroup
            //   onSave={onSave}
            formLabel={"Upload Images"}
            inputBox={[
              {
                label: "Gallery Images",
                placeHolder: "image",
                state: data,
                setState: onChangeState,
                keyProp: "gallery",
                type: "image",
                ratio: "3/2",
                required: true,
                height: "200px",
                multiple: true,
              },
            ]}
          />
        </div>
        <div className="w-full  sm:col-span-2 py-2 flex flex-col">
          <span>Spec Sheet</span>
          <Jodit prop="productDetailTH" state={data} onChange={onChangeState} />
        </div> */}
        <div className="sm:col-span-2 py-2">
          <button
            onClick={onSave}
            className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
