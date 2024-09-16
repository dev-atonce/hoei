import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";

export default function Jodit({ placeholder, onChange, prop, state }: any) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  //   const config = useMemo(
  //     {
  //       readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //       placeholder: placeholder || "Start typings...",
  //     },
  //     [placeholder]
  //   );

  // console.log(content);

  // useEffect(() => {
  //   setContent(state?.prop);
  // }, [state]);

  // useEffect(() => {
  //   onChange(content, prop);
  // }, [content]);

  return (
    <div className="relative z-10">
      <JoditEditor
        className="h-[100vh]"
        ref={editor}
        value={state[prop]}
        // value={state?.prop}
        //   config={config}
        //   @ts-ignore
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => onChange(newContent, prop)}
        // preferred to use only this option to update the content for performance reasons
        // onChange={(newContent) => {}}
      />
    </div>
  );
}
