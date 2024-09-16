import Link from "next/link";

import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";

export default function UserRecord({ i, index, modal, onDelete }: any) {
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

  return (
    <tr key={index}>
      <td className="border-b border-[#eee] px-4 py-5 pl-7 dark:border-strokedark">
        {index + 1}
      </td>
      <td className="border-b border-[#eee] px-4 py-5 pl-7 dark:border-strokedark">
        <h5 className="font-medium text-black dark:text-white">
          {i?.username}
        </h5>
        <p className="text-sm">{i?.role}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 pl-7 dark:border-strokedark">
        <p className="text-black dark:text-white">{i?.email}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 pl-7 dark:border-strokedark text-xs">
        <p>{createdDate}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 pl-7 dark:border-strokedark">
        <div className="flex items-center gap-1">
          <Link
            className="hover:text-white hover:bg-yellow-400 text-yellow-400 border-yellow-400 border p-2 rounded-full"
            href={`user/edit/${i?.id}`}
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
    </tr>
  );
}
