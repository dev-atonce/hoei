import Link from "next/link";
import NavDropDown from "./NavDropdown";
import menuItem from "./menuItem.json";

export default function NavBar() {
  return (
    <>
      <div className="nav-menu" id="scrollable-content">
        {menuItem.map((item: any, key: number) => {
          if (item.subMenu)
            return (
              <NavDropDown
                key={key}
                title={item.title}
                dropdownItems={item.subMenu}
                sectionKey={key}
              />
            );
          else
            return (
              <Link
                key={key}
                href={item.href}
                className={`menu-item px-4 py-3 nav-button hover:text-white hover:bg-[#EE3E3E]`}
              >
                {item.title}
              </Link>
            );
        })}
      </div>
    </>
  );
}
