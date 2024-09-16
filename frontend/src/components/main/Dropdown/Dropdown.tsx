"use client";
import React, { useState } from "react";

const Dropdown = ({
  label,
  list,
  selectedOption,
  status,
  setSelectedOption,
  keyProp,
  topLabel,
  field,

  saveId,
}: any) => {
  // const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="w-full">
      <label className=" text-black dark:text-white">
        {topLabel != false && `${label} `}
      </label>
      <div className="relative z-20 bg-transparent ">
        <select
          disabled={status}
          value={selectedOption[keyProp]}
          onChange={(e: any) => {
            setSelectedOption(e.target.value, keyProp);
            changeTextColor();
          }}
          className={`text-slate-400 relative z-20 w-full appearance-none   hover:cursor-pointer border-stroke  bg-slate-100 rounded-md px-4 py-2px-5 py-3 outline-none transition focus:border-[#0DA1DB] active:border-[#0DA1DB] d ${
            isOptionSelected ? "text-black " : ""
          }`}
        >
          <option value={""} className="text-body ">
            {label}
          </option>

          {list?.map((i: any, k: any) => (
            <option key={k} value={i?.id} className="text-body  uppercase">
              {i?.nameTH}
            </option>
          ))}
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Dropdown;
