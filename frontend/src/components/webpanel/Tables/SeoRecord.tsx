import { BiEdit } from "react-icons/bi";

export default function SeoRecord({ i, index, modal }: any) {
  return (
    <tr key={index}>
      <td className="text-center border-b border-[#eee] ">{index + 1}</td>
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-bold underline text-black dark:text-white ">
          {i?.page}
        </h5>
        <p className="text-xs">{i?.seoTitleTH}</p>
        <p className="text-xs">{i?.seoTitleEN}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        <p className="text-black dark:text-white text-xs ">
          {i?.seoDescriptionTH}
        </p>
        <p className="text-black dark:text-white text-xs">
          {i?.seoDescriptionEN}
        </p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark text-xs">
        <p>{i?.seoKeywordTH}</p>
        <p>{i?.seoKeywordEN}</p>
      </td>
      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark ">
        <div className="flex items-center justify-center space-x-3.5">
          <button
            className="hover:text-white hover:bg-yellow-400 text-yellow-400 border-yellow-400 border p-2 rounded-full"
            onClick={() =>
              modal?.setModalState((prev: any) => ({
                ...prev,
                [i?.id]: !modal?.modalState[i?.id],
              }))
            }
          >
            <BiEdit size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
}
