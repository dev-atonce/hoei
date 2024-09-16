import Input from "@/components/webpanel/Input/Input";

import TextArea from "../Input/TextArea";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import FileInput from "../FileInput/FileInput";

export default function FormGroup({
  formLabel,
  inputBox,
  onSave,
  modalState,
}: any) {
  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full w-full">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white uppercase">
          {formLabel}
        </h3>
      </div>

      <div className="p-5 w-full">
        {inputBox?.map((i: any, index: any) =>
          i?.type === "input" ? (
            <Input
              modalState={modalState}
              label={i?.label}
              placeHolder={i?.placeHolder}
              state={i?.state}
              setState={i?.setState}
              key={index}
              keyProp={i?.keyProp}
              colorPicker={i?.colorPicker}
              width={i?.width}
              languages={i?.languages}
              required={i?.required}
            />
          ) : i?.type === "textArea" ? (
            <TextArea
              modalState={modalState}
              key={index}
              rows={i?.rows}
              label={i?.label}
              placeHolder={i?.placeHolder}
              setState={i?.setState}
              state={i?.state}
              keyProp={i?.keyProp}
              languages={i?.languages}
              required={i?.required}
            />
          ) : i?.type === "image" ? (
            <FileInput
              multiple={i?.multiple}
              // path={"upload-banner"}
              setState={i?.setState}
              state={i?.state}
              objectState={true}
              keyProp={i?.keyProp}
              ratio={i?.ratio}
              height={i?.height}
              label={i?.label}
              uploadAmount={i?.uploadAmount}
            />
          ) : i?.type === "dropDown" ? (
            <SelectGroupOne
              //   @ts-ignore
              label={i?.label}
              setState={i?.setState}
              state={i?.state}
              keyProp={i?.keyProp}
            />
          ) : (
            ""
          )
        )}
        {onSave && (
          <button
            onClick={onSave}
            className="flex w-full justify-center rounded-lg bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
