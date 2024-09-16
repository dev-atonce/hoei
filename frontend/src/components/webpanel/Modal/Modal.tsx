import { useContext, useEffect, useState } from "react";
import FormGroup from "../FormGroup/FormGroup";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { FetchContext } from "@/contexts/FetchContext";

export default function Modal({
  type,
  show,
  id,
  setShow,
  data,
  languages,
}: any) {
  const { onSave: onSaveChange }: any = useContext(FetchContext);
  const [state, setState] = useState({});
  // Tracking Form Change
  const onChangeState = (e: any, field: string) => {
    setState((prevState) => ({ ...prevState, [field]: e }));
  };

  const onSave = async () => {
    const modifiedState = { ...state };
    //   @ts-ignore
    delete modifiedState?.id;
    //   @ts-ignore
    delete modifiedState?.updatedAt;
    //   @ts-ignore
    delete modifiedState?.page;

    onSaveChange(
      modifiedState,
      "PUT",
      //   @ts-ignore
      state?.id,
      "seo",
      `Edit SEO: ${data?.page}`
    );

    // setTimeout(() => {
    //   setShow((prev: any) => ({
    //     ...prev,
    //     [id]: !show,
    //   }));
    // }, 2500);
  };

  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <div
      className={`${
        !show ? "bottom-[200%]" : "bottom-0"
      } w-full h-[100vh] bg-black/90 fixed  left-0 transition-all duration-700 z-[1020] `}
    >
      <div
        className="absolute top-0 bottom-0 left-0 right-0  z-[10001]"
        onClick={() =>
          setShow((prev: any) => ({
            ...prev,
            [id]: !show,
          }))
        }
      ></div>
      {type === "seo" && (
        <div className="w-[60%] px-4 py-4  absolute top-[2%] left-[50%] translate-x-[-50%]  rounded-xl  bg-slate-600 z-[10002] ">
          <div
            className="text-slate-500 absolute top-6 right-6 hover:cursor-pointer "
            onClick={() => setShow(!show)}
          >
            <RxCross2 size={30} />
          </div>
          <FormGroup
            modalState={show}
            id={id}
            onSave={onSave}
            formLabel={data?.page}
            inputBox={[
              {
                label: "Title",
                placeHolder: "Page Title",
                state: state,
                setState: onChangeState,
                keyProp: "seoTitle",
                type: "input",
                languages,
              },
              {
                label: "Keywords",
                placeHolder: "META Keywords",
                state: state,
                setState: onChangeState,
                keyProp: "seoKeyword",
                type: "input",
                languages,
              },
              {
                label: "Description",
                placeHolder: "META Description",
                state: state,
                setState: onChangeState,
                keyProp: "seoDescription",
                type: "textArea",
                rows: 3,
                languages,
              },
            ]}
          />
        </div>
      )}
      {type === "user" && (
        <div className="w-[60%] px-4 py-4  absolute top-[15%] left-[50%] translate-x-[-50%]  rounded-xl  bg-slate-100 z-[10002]">
          <div
            className="text-slate-500 absolute top-6 right-6 hover:cursor-pointer "
            onClick={() => setShow(!show)}
          >
            <RxCross2 size={30} />
          </div>
          <FormGroup
            id={id}
            onSave={onSave}
            formLabel={data?.page}
            inputBox={[
              {
                label: "User Type",
                placeHolder: "User Name",
                state: state,
                setState: onChangeState,
                keyProp: "seoTitle",
                type: "dropDown",
              },
              {
                label: "Name",
                placeHolder: "User Name",
                state: state,
                setState: onChangeState,
                keyProp: "seoTitle",
                type: "input",
              },
              {
                label: "E-Mail",
                placeHolder: "User Email",
                state: state,
                setState: onChangeState,
                keyProp: "seoKeyword",
                type: "input",
              },
              {
                label: "New Password",
                placeHolder: "For Changing Password Only",
                state: state,
                setState: onChangeState,
                keyProp: "seoKeyword",
                type: "input",
              },
              {
                label: "Confirmed New Password",
                placeHolder: "For Changing Password Only",
                state: state,
                setState: onChangeState,
                keyProp: "seoKeyword",
                type: "input",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
