import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
// import { useSelectedLayoutSegment } from "next/navigation";

export default function NavDropdown({ title, dropdownItems }: any) {
  // const [active, setActive] = useState(false);
  const [show, setShow] = useState<String>("hidden");
  const [toggle, setToggle] = useState<Boolean>(false);
  // const activeSegment = useSelectedLayoutSegment();

  return (
    <>
      <button
        data-toggle={toggle}
        onMouseOver={(e) => {
          setShow("show");
          setToggle(true);
        }}
        onMouseLeave={(e) => {
          setShow("hidden");
          setToggle(false);
        }}
        data-dropdown-toggle="dropdownNavbar"
        data-dropdown-offset-skidding="100"
        className="menu-item text-white nav-button px-4 py-3 md:border-0 flex items-center justify-between w-full md:w-auto relative "
      >
        {title}
        <FaChevronDown
          className={`text-sm ml-2 transition-all ${toggle ? `rotate-90` : ``}`}
        />
        <div
          id="dropdownNavbar"
          className={`absolute ${show} dropdown z-20 bg-white overflow-hidden left-0 w-100 ${show ? `mt-12` : ``}`}
        >
          <ul aria-labelledby="dropdownLargeButton">
            {dropdownItems.map((v: any, k: any) => {
              return (
                <li key={k} className="divide-x divide-violet-50">
                  <Link
                    href={v?.href}
                    className={`text-slate-600 text-start hover:bg-slate-200 block px-4 py-2`}
                  >
                    {v?.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </button>
    </>
  );
}
