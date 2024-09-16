import { useContext, useEffect, useState } from "react";
import FormGroup from "../FormGroup/FormGroup";
import ImageComponent from "@/components/common/ImageComponent/ImageComponent";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { FetchContext } from "@/contexts/FetchContext";

export default function MainCatForm({
  data,
  onSave,
  languages,
  onChangeState,
  id,
  onSaveSeo,
  onChangeSeoState,
  mainCat,
}: any) {
  const { onFetchOne }: any = useContext(FetchContext);
  const [mainCatData, setMainCatData] = useState([]);
  const [showEditCat, setShowEditCat] = useState(false);

  const onFetchMainCat = async () => {
    const data = await onFetchOne("mainCategory", null);
    setMainCatData(data?.rows);
  };

  useEffect(() => {
    onFetchMainCat();

    // onChangeState(data?.mainCategory?.nameTH, "mainCategory");
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-4 ">
        {mainCat && (
          <div className="flex gap-2">
            <button
              onClick={() => onChangeState("both", "type")}
              className={`${data?.type == "both" && "border-green-500 font-bold text-green-500 border-2 shadow-lg"} border rounded px-4`}
            >
              BOTH
            </button>
            <button
              onClick={() => onChangeState("rent", "type")}
              className={`${data?.type == "rent" && "border-green-500 font-bold text-green-500 border-2  shadow-lg"} border rounded px-4`}
            >
              RENT
            </button>
            <button
              onClick={() => onChangeState("sale", "type")}
              className={`${data?.type == "sale" && "border-green-500 font-bold text-green-500 border-2  shadow-lg"} border rounded px-4`}
            >
              SALE
            </button>
          </div>
        )}
        {!mainCat && (
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full py-2 px-6">
            {data?.curMainCat ? (
              <>
                <div className="flex justify-between">
                  <span>
                    Main Category:
                    <span className="font-semibold">{data?.curMainCat}</span>
                  </span>
                  <button
                    className="border-yellow-500 px-2 rounded-md text-yellow-500 border"
                    onClick={() => setShowEditCat(!showEditCat)}
                  >
                    Change
                  </button>
                </div>
                {showEditCat && (
                  <SelectGroupOne
                    // @ts-ignore
                    topLabel={false}
                    // @ts-ignore
                    label={"Main Category"}
                    // @ts-ignore
                    list={mainCatData}
                    selectedOption={data}
                    setSelectedOption={onChangeState}
                    keyProp="mainCategory"
                    field="nameTH"
                    saveId={true}
                  />
                )}
              </>
            ) : (
              <SelectGroupOne
                // @ts-ignore
                topLabel={true}
                // @ts-ignore
                label={"Main Category"}
                // @ts-ignore
                list={mainCatData}
                selectedOption={data}
                setSelectedOption={onChangeState}
                keyProp="mainCategory"
                field="nameTH"
                saveId={true}
              />
            )}
          </div>
        )}
        <FormGroup
          //   onSave={onSave}
          formLabel={mainCat ? "Main Category" : "Sub-Category"}
          inputBox={[
            {
              label: mainCat ? "Main Category Name" : "Sub-Category Name",
              placeHolder: mainCat ? "Main Category Name" : "Sub-Category Name",
              state: data,
              setState: onChangeState,
              keyProp: "name",
              type: "input",
              languages: languages,
              required: true,
            },

            {
              label: "Image",
              placeHolder: "image",
              state: data,
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
              state: data,
              setState: onChangeState,
              keyProp: "imageAlt",
              type: "input",
              required: true,
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-9">
        <FormGroup
          // modalState={show}
          id={id}
          //   onSave={onSaveSeo}
          formLabel={"SEO Settings"}
          inputBox={[
            {
              label: "Title",
              placeHolder: "Page Title",
              state: data?.seo,
              setState: onChangeSeoState,
              keyProp: "title",
              type: "input",
              languages,
            },
            {
              label: "Keywords",
              placeHolder: "META Keywords",
              state: data?.seo,
              setState: onChangeSeoState,
              keyProp: "keyword",
              type: "input",
              languages,
            },
            {
              label: "Description",
              placeHolder: "META Description",
              state: data?.seo,
              setState: onChangeSeoState,
              keyProp: "description",
              type: "textArea",
              rows: 3,
              languages,
            },
          ]}
        />
      </div>
      <div className="sm:col-span-2 py-2">
        <button
          onClick={onSave}
          className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
}
