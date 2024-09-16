"use client";
import { useState } from "react";

export default function FileInput({
  path,
  setState,
  state,
  objectState,
  keyProp,
  multiple,
  label,
  ratio,
  height,
  uploadAmount,
}: any) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const onBrowseImage = (e: any) => {
    if (multiple) {
      let file1: File[] = [];
      for (let i = 0; i < e.target.files?.length; i++) {
        if (uploadAmount) {
          if (i < uploadAmount) {
            file1.push(e.target.files?.[i]);
          }
        } else {
          file1.push(e.target.files?.[i]);
        }
      }
      // setFile(file1);

      setState(file1, keyProp);
    } else {
      //   setSingleFile(e.target.files?.[0]);
      //   setState((prev: any) => ({ ...prev, ["abc"]: e.target.files?.[0] }));

      setState(e.target.files?.[0], keyProp);
    }

    imageChange(e);
  };

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      if (multiple) {
        if (uploadAmount) {
          setSelectedImages(
            // @ts-ignore
            Object.values(e.target.files).filter(
              (i: any, index: any) => index < uploadAmount
            )
          );
        } else {
          setSelectedImages(Object.values(e.target.files));
        }
      } else {
        setSelectedImage(e.target.files[0]);
      }
    }
  };

  return (
    <>
      <div className="mb-2">
        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
          {label}
        </label>
        {!multiple ? (
          <div
            className={`bg-slate-100  mb-2  rounded-md overflow-hidden`}
            style={{ height: height, aspectRatio: ratio }}
          >
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                className="h-full w-full object-cover"
              />
            ) : state[keyProp] ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${state[keyProp]}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-slate-200 flex">
                <h5 className="text-center my-auto mx-auto text-slate-400 text-3xl">
                  {label}
                </h5>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {selectedImages &&
              selectedImages.map((i: any, index: any) => (
                <div
                  key={index}
                  className={`bg-slate-100  mb-2  rounded-md overflow-hidden`}
                  style={{ height: height, aspectRatio: ratio }}
                >
                  <img
                    key={index}
                    src={URL.createObjectURL(i)}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
          </div>
        )}
        <input
          multiple={multiple}
          //   name="file"
          id="formFile"
          onChange={onBrowseImage}
          type="file"
          className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-2 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
        />
      </div>
    </>
  );
}
