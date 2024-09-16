import "./style.scss";

export default function DynamicContent({ content }: any) {
  return (
    <>
      {content && (
        <div
          className="dynamic-content "
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
    </>
  );
}
