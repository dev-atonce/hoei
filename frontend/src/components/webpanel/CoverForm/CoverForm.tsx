import { useState } from "react";
import Jodit from "../Editor/Jodit";
import FormGroup from "../FormGroup/FormGroup";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import TextEditor from "@/components/TextEditor";

export default function CoverForm({
  languages,
  onSaveGeneral,
  serviceState,
  onChangeState,
  id,
  onSaveSeo,
  onChangeSeoState,
  onDeleteImageGallery,
}: any) {
  const [langState, setLangState] = useState(
    process.env.NEXT_PUBLIC_MAIN_LANGUAGE
  );

  const maxImgUpload = 12;
  const currentImgAmount = serviceState?._gallery
    ? serviceState?._gallery?.length
    : 0;
  const uploadAmount = maxImgUpload - currentImgAmount;

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <FormGroup
          // onSave={onSaveGeneral}
          formLabel="General Info."
          inputBox={[
            {
              label: "Title",
              placeHolder: "Title",
              state: serviceState,
              setState: onChangeState,
              keyProp: "title",
              type: "input",

              required: true,
            },

            {
              label: "Link",
              placeHolder: "Link",
              state: serviceState,
              setState: onChangeState,
              keyProp: "link",
              type: "input",
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-9 bg-white rounded-xl px-4">
        <div className="w-full  sm:col-span-2 py-2 flex flex-col gap-y-2">
          <FormGroup
            //   onSave={onSave}
            formLabel={`Upload Banner`}
            inputBox={[
              {
                label: "Image",
                placeHolder: "image",
                state: serviceState,
                setState: onChangeState,
                keyProp: "image",
                type: "image",
                ratio: "16/5",
                required: true,
                height: "auto",
                multiple: false,
              },
              {
                label: "Image ALT",
                placeHolder: "alt",
                state: serviceState,
                setState: onChangeState,
                keyProp: "imageAlt",
                type: "input",
                required: true,
              },
            ]}
          />
        </div>
      </div>

      <button
        onClick={onSaveGeneral}
        className="mt-[-20px] flex w-full col-span-2 justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
      >
        Save
      </button>
    </div>
  );
}
