import { useState } from "react";
import Jodit from "../Editor/Jodit";
import FormGroup from "../FormGroup/FormGroup";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";
import TextEditor from "@/components/TextEditor";

export default function ClientForm({
  languages,
  onSaveGeneral,
  serviceState,
  onChangeState,
  id,
  onSaveSeo,
  onChangeSeoState,
  onDeleteImageGallery,
}: any) {
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <div className="flex flex-col gap-9">
        <FormGroup
          // onSave={onSaveGeneral}
          formLabel="General Info."
          inputBox={[
            {
              label: "Client Name",
              placeHolder: "Client",
              state: serviceState,
              setState: onChangeState,
              keyProp: "title",
              type: "input",

              required: true,
            },

            {
              label: "Image",
              placeHolder: "image",
              state: serviceState,
              setState: onChangeState,
              keyProp: "image",
              type: "image",
              ratio: "3/2",
              required: true,
              height: "200px",
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

      <button
        onClick={onSaveGeneral}
        className="mt-[-20px] flex w-full col-span-2 justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
      >
        Save
      </button>
    </div>
  );
}
