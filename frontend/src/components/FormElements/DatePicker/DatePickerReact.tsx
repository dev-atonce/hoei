import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
export default function App({ data, setData }: any) {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleChange = (range: any) => {
    const [startDate, endDate] = range;

    setData((prev: any) => ({ ...prev, start: startDate, end: endDate }));
  };

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden">
      {/* @ts-ignore */}
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={data?.start}
        endDate={data?.end}
        selectsRange
      />
    </div>
  );
}
