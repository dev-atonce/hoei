import { useContext, useEffect, useState } from "react";
import FormGroup from "../FormGroup/FormGroup";
import ImageComponent from "@/components/common/ImageComponent/ImageComponent";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import { FetchContext } from "@/contexts/FetchContext";
import Jodit from "../Editor/Jodit";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

export default function ProductForm({
  data,
  onSave,
  languages,
  onChangeState,
  id,
  onSaveSeo,
  onChangeSeoState,
  mainCat,
  onDeleteImageGallery,
}: any) {
  const { onFetchOne, onDeleteGallery }: any = useContext(FetchContext);
  const [mainCatData, setMainCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [filteredSubCat, setFilteredSubCat] = useState([]);
  const [showEditCat, setShowEditCat] = useState(false);

  const onFetchMainCat = async () => {
    const data = await onFetchOne("mainCategory", null);
    const subCat = await onFetchOne("subCategory", null);
    setMainCatData(data?.rows);
    setSubCatData(subCat?.rows);
  };

  const onSelectMainCat = () => {
    const filtered = subCatData?.filter(
      (i: any) => i?.mainCategory?.id == data?.mainCategory
    );
    setFilteredSubCat(filtered);
  };

  useEffect(() => {
    onFetchMainCat();
  }, []);

  useEffect(() => {
    onSelectMainCat();
  }, [data?.mainCategory]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-4 ">
          {!mainCat && (
            <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full py-2 px-6">
              {data?.curSubCat ? (
                <>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span>
                        Type:
                        <span className="font-semibold uppercase">
                          {data?.curType}
                        </span>
                      </span>
                      <span>
                        Main Category:
                        <span className="font-semibold">
                          {data?.curMainCat}
                        </span>
                      </span>
                      <span>
                        Sub-Category:
                        <span className="font-semibold">{data?.curSubCat}</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="border-yellow-500 px-2 rounded-md text-yellow-500 border py-1"
                        onClick={() => setShowEditCat(!showEditCat)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  {showEditCat && (
                    <>
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
                      <SelectGroupOne
                        // @ts-ignore
                        topLabel={false}
                        // @ts-ignore
                        label={"Sub-Category"}
                        // @ts-ignore
                        list={filteredSubCat}
                        selectedOption={data}
                        setSelectedOption={onChangeState}
                        keyProp="subCategory"
                        field="nameTH"
                        saveId={true}
                      />
                      <SelectGroupOne
                        // @ts-ignore
                        topLabel={false}
                        // @ts-ignore
                        label={"Type"}
                        // @ts-ignore
                        list={[
                          { title: "rent", value: "rent" },
                          { title: "sale", value: "sale" },
                        ]}
                        selectedOption={data}
                        setSelectedOption={onChangeState}
                        keyProp="type"
                        // field="nameTH"
                        saveId={false}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
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
                  <SelectGroupOne
                    // @ts-ignore
                    topLabel={true}
                    // @ts-ignore
                    label={"Sub-Category"}
                    // @ts-ignore
                    list={filteredSubCat}
                    selectedOption={data}
                    setSelectedOption={onChangeState}
                    keyProp="subCategory"
                    field="nameTH"
                    saveId={true}
                  />
                  <SelectGroupOne
                    // @ts-ignore
                    topLabel={true}
                    // @ts-ignore
                    label={"Type"}
                    // @ts-ignore
                    list={[
                      { title: "rent", value: "rent" },
                      { title: "sale", value: "sale" },
                    ]}
                    selectedOption={data}
                    setSelectedOption={onChangeState}
                    keyProp="type"
                    // field="nameTH"
                    saveId={false}
                  />
                </>
              )}
            </div>
          )}
          <FormGroup
            //   onSave={onSave}
            formLabel={"Product"}
            inputBox={[
              {
                label: "Product Name",
                placeHolder: "Product Name",
                state: data,
                setState: onChangeState,
                keyProp: "productName",
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
          {/* to do seo */}
          <FormGroup
            // modalState={show}
            id={id}
            //   onSave={onSaveSeo}
            formLabel={"SEO Settings"}
            inputBox={[
              {
                label: "Title",
                placeHolder: "Page Title",
                state: data?.productSeo,
                setState: onChangeSeoState,
                keyProp: "title",
                type: "input",
                languages,
              },
              {
                label: "Keywords",
                placeHolder: "META Keywords",
                state: data?.productSeo,
                setState: onChangeSeoState,
                keyProp: "keyword",
                type: "input",
                languages,
              },
              {
                label: "Description",
                placeHolder: "META Description",
                state: data?.productSeo,
                setState: onChangeSeoState,
                keyProp: "description",
                type: "textArea",
                rows: 3,
                languages,
              },
            ]}
          />
        </div>
        <div className="w-full  sm:col-span-2 py-2 flex flex-col gap-y-2">
          <span>Gallery</span>
          <div className=" flex flex-wrap gap-2 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full py-2 px-6">
            {data?._gallery?.map((item: any, index: any) => (
              <div
                key={index}
                className="h-[200px] rounded-lg overflow-hidden relative"
              >
                <div
                  onClick={() => onDeleteImageGallery(index)}
                  className="absolute top-2 right-2 p-2 bg-red rounded-full hover:cursor-pointer text-white"
                >
                  <MdDeleteForever size={20} />
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${item}`}
                  alt="gallery"
                  width="400"
                  height="400"
                  className="h-full w-full object-cover aspect-[3/2]"
                />
              </div>
            ))}
          </div>
          <FormGroup
            //   onSave={onSave}
            formLabel={"Upload Images"}
            inputBox={[
              {
                label: "Gallery Images",
                placeHolder: "image",
                state: data,
                setState: onChangeState,
                keyProp: "gallery",
                type: "image",
                ratio: "3/2",
                required: true,
                height: "200px",
                multiple: true,
              },
            ]}
          />
        </div>
        <div className="w-full  sm:col-span-2 py-2 flex flex-col">
          <span>Spec Sheet</span>
          <Jodit prop="productDetailTH" state={data} onChange={onChangeState} />
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
    </>
  );
}
