import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarDropdown from "./SidebarDropdown";

interface SidebarItemProps {
  item: {
    label: string;
    route: string;
    icon?: React.ReactNode;
    children?: SidebarItemProps["item"][];
  };
  pageName: string;
  setPageName: (name: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, pageName, setPageName }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () => {
    const updatedPageName = pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    setPageName(updatedPageName);
  };

  const pathname = usePathname();

  const isActive = (currentItem: SidebarItemProps["item"]): boolean => {
    if (currentItem.route === pathname) return true;
    if (currentItem.children) {
      return currentItem.children.some(isActive);
    }
    return false;
  };

  const isItemActive = isActive(item);

  return (
      <>
        <Link
            href={item.route}
            onClick={handleClick}
            className={`${
                isItemActive ? "bg-primary text-white" : "text-gray-500"
            } group relative flex items-center gap-2.5 rounded-sm px-2 py-2 font-medium hover:bg-primary hover:text-white duration-300 ease-in-out`}
        >
          {item.icon}
          {item.label}
          {item.children && (
              <svg
                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                      isMounted && pageName === item.label.toLowerCase() ? "rotate-180" : ""
                  }`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                    fill=""
                />
              </svg>
          )}
        </Link>

        {item.children && (
            <div
                className={`transform overflow-hidden ${
                    isMounted && pageName !== item.label.toLowerCase() ? "hidden" : ""
                }`}
            >
              <SidebarDropdown item={item.children} />
            </div>
        )}
      </>
  );
};

export default SidebarItem;
