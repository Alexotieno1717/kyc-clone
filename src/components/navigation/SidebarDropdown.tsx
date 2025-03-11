import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
    label: string;
    route: string;
}

interface SidebarDropdownProps {
    item: SidebarItem[];
}

const SidebarDropdown = ({ item }: SidebarDropdownProps) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item: SidebarItem, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`group relative flex items-center font-semibold gap-2.5 rounded-md px-4 duration-300 ease-in-out data-[focus]:bg-blue-100 hover:text-primary/90  ${
                pathname === item.route ? "text-primary/90" : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
