"use client";
import SwitcherThree from "../Switchers/SwitcherThree";
import { useEffect, useState } from "react";

export default function ContactFormRecord({
  i,
  index,
  onChangeStatus,
  currentPage,
}: any) {
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

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(Boolean(i?.status));
  }, [i]);

  return (
    <>
      <tr key={index}>
        <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
          {(currentPage - 1) * Number(process.env.NEXT_PUBLIC_PERPAGE) +
            (index + 1)}
        </td>
        <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
          {i?.email}
        </td>
        <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
          {i?.contactName}
        </td>
        <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
          {i?.telephone}
        </td>
        <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs truncate">
          {i?.detail}
        </td>
        <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark text-xs">
          <p className="">{createdDate}</p>
        </td>
        <td className="border-b border-[#eee] px-4 pl-7 py-5 dark:border-strokedark">
          <SwitcherThree
            id={i?.id}
            enabled={enabled}
            setEnabled={setEnabled}
            onChange={onChangeStatus}
          />
        </td>
      </tr>
    </>
  );
}
