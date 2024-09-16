"use client";
import { RxDragHandleHorizontal } from "react-icons/rx";
import SeoRecord from "./SeoRecord";
import ServiceRecord from "./ServiceRecord";
import UserRecord from "./UserRecord";
import { useContext, useRef } from "react";
import LogRecord from "./LogRecord";
import { FetchContext } from "@/contexts/FetchContext";
import CoverRecord from "./CoverRecord";
import ContactFormRecord from "./ContactFormRecord";
import ClientRecord from "./ClientRecord";
import { LogInContext } from "@/contexts/LogInContext";

const TableThree = ({
  data,
  col,
  modal,
  type,
  drag,
  setData,
  onDelete,
  currentPage,
}: any) => {
  const {
    onSave,
    onChangeStatus: onStatus,
    onSort,
  }: any = useContext(FetchContext);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const { user, noAuth }: any = useContext(LogInContext);

  const usersForAdmin = data?.filter((i: any) => i?.role !== "super");

  const onUpdateSort = async (id: any, order: any) => {
    onSort(order, id, type, `${type} Sort `);
  };

  const onChangeStatus = async (id: any, status: any) => {
    onStatus(status, id, type, `Change ${type} Status`);
  };

  const handleSort = () => {
    let _data = [...data];
    // @ts-ignore
    const draggedItemContent = _data?.splice(dragItem.current, 1)[0];
    // @ts-ignore
    _data.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    // const __data = _data?.map((i: any, key) => ({ ...i, sort: key }));
    const __data = _data?.map((i: any, key) => {
      onUpdateSort(i?.id, key);
      return { ...i, sort: key };
    });

    setData(__data);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {drag ? (
                <th className=" px-4 pl-7 py-4 font-medium text-black dark:text-white">
                  <RxDragHandleHorizontal size={25} />
                </th>
              ) : (
                <th className=" px-4 pl-7 py-4 font-medium text-black dark:text-white">
                  No.
                </th>
              )}
              {col?.map((i: any, k: any) => (
                <th
                  key={k}
                  className={`px-4 pl-7 py-4 font-medium text-black dark:text-white`}
                  style={{ minWidth: i.minWidth }}
                >
                  {i?.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {type === "seo" &&
              data?.map((i: any, key: any) => (
                <SeoRecord i={i} index={key} modal={modal} key={key} />
              ))}
            {type === "service" &&
              data?.map((i: any, key: any) => (
                <ServiceRecord
                  i={i}
                  index={key}
                  modal={modal}
                  drag={drag}
                  onDragEnd={handleSort}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                  onChangeStatus={onChangeStatus}
                  key={key}
                  onDelete={onDelete}
                  currentPage={currentPage}
                />
              ))}
            {type === "client" &&
              data?.map((i: any, key: any) => (
                <ClientRecord
                  i={i}
                  index={key}
                  drag={drag}
                  onDragEnd={handleSort}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                  onChangeStatus={onChangeStatus}
                  key={key}
                  onDelete={onDelete}
                  currentPage={currentPage}
                />
              ))}
            {type === "banner" &&
              data?.map((i: any, key: any) => (
                <CoverRecord
                  i={i}
                  index={key}
                  modal={modal}
                  drag={drag}
                  onDragEnd={handleSort}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                  onChangeStatus={onChangeStatus}
                  key={key}
                  onDelete={onDelete}
                  currentPage={currentPage}
                />
              ))}
            {type === "contact-form" &&
              data?.map((i: any, key: any) => (
                <ContactFormRecord
                  i={i}
                  index={key}
                  onChangeStatus={onChangeStatus}
                  key={key}
                  onDelete={onDelete}
                  currentPage={currentPage}
                />
              ))}
            {type === "log" &&
              data?.map((i: any, key: any) => (
                <LogRecord i={i} index={key} modal={modal} key={key} />
              ))}
            {type === "user" &&
              user?.role === "super" &&
              data?.map((i: any, key: any) => (
                <UserRecord
                  key={key}
                  i={i}
                  index={key}
                  modal={modal}
                  onDelete={onDelete}
                />
              ))}
            {type === "user" &&
              user?.role === "admin" &&
              usersForAdmin?.map((i: any, key: any) => (
                <UserRecord
                  key={key}
                  i={i}
                  index={key}
                  modal={modal}
                  onDelete={onDelete}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
