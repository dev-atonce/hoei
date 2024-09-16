import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiDeleteBinLine, RiDraggable } from "react-icons/ri";
import { RxDragHandleHorizontal } from "react-icons/rx";
import SwitcherThree from "../Switchers/SwitcherThree";
import { useEffect, useState } from "react";

export default function ServiceRecord({
  i,
  index,
  modal,
  drag,
  onDragStart,
  onDragEnd,
  onChangeStatus,
  dragItem,
  dragOverItem,
  onDelete,
  currentPage,
}: any) {
  const [enabled, setEnabled] = useState(false);
  const options = {
    timeZone: "Asia/Bangkok", // GMT+7 (Indochina Time)
    timeZoneName: "short", // Include the timezone abbreviation
    hour12: false, // Use 24-hour format
  };

  // Ensure i and i.createdAt exist before accessing properties
  const timestamp =
    i && i.createdAt ? i.createdAt.toLocaleString("en-US", options) : null;

  // Check if timestamp is not null before further processing
  const createdDate = timestamp ? formatDate(new Date(timestamp)) : null;

  function formatDate(date: any) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  useEffect(() => {
    setEnabled(Boolean(i?.status));
  }, [i]);

  return (
    <>
      {drag ? (
        <tr
          key={index}
          draggable
          className=" "
          onDragStart={(e: any) => (dragItem.current = index)}
          onDragEnter={(e: any) => (dragOverItem.current = index)}
          onDragEnd={onDragEnd}
          onDragOver={(e: any) => e.preventDefault()}
        >
          <td className="hover:cursor-move text-center border-b border-[#eee] px-4 py-5 pl-7 dark:border-strokedark">
            <RxDragHandleHorizontal size={25} />
          </td>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
            <h5 className="font-medium text-black dark:text-white">
              {i?.serviceNameEN}
            </h5>
            <p className="text-sm"> {i?.serviceNameTH}</p>
          </td>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
            <p>{createdDate}</p>
          </td>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
            <div className="flex items-center gap-1">
              <Link
                href={`/service/${i?.id}`}
                className="hover:text-white hover:bg-blue-400 text-blue-400 border-blue-400 border p-2 rounded-full"
              >
                <MdOutlineRemoveRedEye size={20} />
              </Link>
              <Link
                className="hover:text-white hover:bg-yellow-400 text-yellow-400 border-yellow-400 border p-2 rounded-full"
                href={`/webpanel/service/edit/${i?.id}`}
              >
                <BiEdit size={20} />
              </Link>
              <button
                onClick={() => onDelete(i?.id)}
                className="hover:text-white hover:bg-red text-red border-red border p-2 rounded-full"
              >
                <RiDeleteBinLine size={20} />
              </button>
            </div>
          </td>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark">
            <div className=" text-center">
              <SwitcherThree
                id={i?.id}
                enabled={enabled}
                setEnabled={setEnabled}
                onChange={onChangeStatus}
              />
            </div>
          </td>
        </tr>
      ) : (
        <tr key={index}>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
            {(currentPage - 1) * Number(process.env.NEXT_PUBLIC_PERPAGE) +
              (index + 1)}
          </td>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
            <h5 className="font-medium text-black dark:text-white">
              {i?.serviceNameEN}
            </h5>
            <p className="text-sm"> {i?.serviceNameTH}</p>
          </td>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
            <p>{createdDate}</p>
          </td>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
            <div className="flex items-center gap-1">
              <Link
                href={`/service/${i?.id}`}
                className="hover:text-white hover:bg-blue-400 text-blue-400 border-blue-400 border p-2 rounded-full"
              >
                <MdOutlineRemoveRedEye size={20} />
              </Link>
              <Link
                className="hover:text-white hover:bg-yellow-400 text-yellow-400 border-yellow-400 border p-2 rounded-full"
                href={`/webpanel/service/edit/${i?.id}`}
              >
                <BiEdit size={20} />
              </Link>
              <button
                onClick={() => onDelete(i?.id)}
                className="hover:text-white hover:bg-red text-red border-red border p-2 rounded-full"
              >
                <RiDeleteBinLine size={20} />
              </button>
            </div>
          </td>
          <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark">
            <div className=" text-center">
              <SwitcherThree
                id={i?.id}
                enabled={enabled}
                setEnabled={setEnabled}
                onChange={onChangeStatus}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
