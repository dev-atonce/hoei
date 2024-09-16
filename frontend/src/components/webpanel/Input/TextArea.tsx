import { useEffect, useState } from "react";

export default function TextArea({
  label,
  placeHolder,
  rows,
  state,
  setState,
  keyProp,
  languages,
  modalState,
  required,
}: any) {
  const [langState, setLangState] = useState(
    process.env.NEXT_PUBLIC_MAIN_LANGUAGE
  );

  useEffect(() => {
    setLangState(process.env.NEXT_PUBLIC_MAIN_LANGUAGE);
  }, [modalState]);
  return (
    <>
      {languages ? (
        <div
          className={`mb-4.5 ${required && "bg-slate-100/40 dark:bg-slate-800 rounded-lg p-2"}`}
        >
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            {label} {required && <span className="text-red">REQUIRED**</span>}
          </label>

          <div className="flex gap-[1px] translate-y-2 translate-x-2 relative z-0">
            {languages.map((i: any, k: any) => (
              <button
                key={k}
                onClick={() => setLangState(i?.toLowerCase())}
                className={`${langState === i?.toLowerCase() ? "border-primary text-primary  scale-[110%] " : "border-slate-200 text-slate-200"} uppercase transition-all duration-100 items-center justify-center rounded-md border  px-2 py-1 text-center font-medium hover:bg-opacity-90 `}
              >
                {i}
              </button>
            ))}
          </div>
          {languages?.map(
            (i: any, k: any) =>
              i?.toLowerCase() === langState && (
                <div className="relative z-1" key={k}>
                  <textarea
                    onChange={(e: any) => setState(e.target.value, keyProp + i)}
                    value={state && state[keyProp + i]}
                    rows={rows}
                    placeholder={`${placeHolder} ${i}`}
                    className={`${required && "border border-red"} bg-white w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  ></textarea>
                </div>
              )
          )}
        </div>
      ) : (
        <div
          className={`mb-4.5 ${required && "bg-slate-100/40 dark:bg-slate-800 rounded-lg p-2"}`}
        >
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            {label} {required && <span className="text-red">REQUIRED**</span>}
          </label>
          <textarea
            onChange={(e: any) => setState(e.target.value, keyProp)}
            value={state && state[keyProp]}
            rows={rows}
            placeholder={placeHolder}
            className={`${required && "border border-red"} bg-white w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
          ></textarea>
        </div>
      )}
    </>
  );
}
