import { useEffect, useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";

export default function Input({
  label,
  state,
  setState,
  placeHolder,
  keyProp,
  colorPicker,
  width,
  languages,
  modalState,
  required,
}: any) {
  // const [langState, setLangState] = useState(languages[0] || "");
  const [langState, setLangState] = useState(
    process.env.NEXT_PUBLIC_MAIN_LANGUAGE
  );

  useEffect(() => {
    setLangState(process.env.NEXT_PUBLIC_MAIN_LANGUAGE);
  }, [modalState]);

  return (
    <div
      className={`mb-4.5 ${required && "bg-slate-100/40 dark:bg-slate-800 rounded-lg p-2"}`}
    >
      {colorPicker ? (
        <div className="">
          <div className="flex justify-between">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              {label}
            </label>
            <ColorPicker setState={setState} state={state} keyProp={keyProp} />
          </div>
        </div>
      ) : languages ? (
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            {label} {required && <span className="text-red">REQUIRED**</span>}
          </label>
          <div className="flex gap-[1px] translate-y-2 translate-x-2 relative z-0">
            {languages.map((i: any, k: any) => (
              <button
                key={k}
                onClick={() => setLangState(i?.toLowerCase())}
                className={`${langState === i?.toLowerCase() ? "border-primary text-primary scale-[110%] " : "  border-slate-200 text-slate-200"} uppercase transition-all duration-100 items-center justify-center rounded-md border  px-2 py-1 text-center font-medium hover:bg-opacity-90 `}
              >
                {i}
              </button>
            ))}
          </div>
          {languages?.map((i: any, index: number) => {
            return (
              i?.toLowerCase() === langState && (
                <div key={index} className="relative z-1">
                  <input
                    onChange={(e: any) => setState(e.target.value, keyProp + i)}
                    name={i}
                    value={state && state[keyProp + i]}
                    type="text"
                    placeholder={`${placeHolder} ${i}`}
                    className={`${required && "border border-red"} bg-white w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                </div>
              )
            );
          })}
        </div>
      ) : (
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            {label} {required && <span className="text-red">REQUIRED**</span>}
          </label>
          <input
            onChange={(e: any) => setState(e.target.value, keyProp)}
            value={state && state[keyProp]}
            type="text"
            placeholder={placeHolder}
            className={`${required && "border border-red"} w-full rounded border-[1.5px] bg-white border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
          />
        </div>
      )}
    </div>
  );
}
