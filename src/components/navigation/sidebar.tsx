"use client";

import SidebarItem from "./SidebarItem";
import { FootermenuGroups, menuGroups } from "@/types/constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import { JSX, Key } from "react";

interface ISidebarProps {
	sidebarOpen: boolean,
	toggleSidebar: () => void,
}

const Sidebar = ({sidebarOpen}: ISidebarProps) => {

  	const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

	return (
		<aside
			id="logo-sidebar"
			className={`fixed top-0 left-0 z-40  w-72 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 ${sidebarOpen? 'translate-x-0' : '  sm:translate-x-0 '}`}
			aria-label="Sidebar"
		>
			<div className="flex flex-col h-full px-3 pb-4 overflow-y-auto bg-white">
				{menuGroups.map((group, groupIndex) => (
					<div key={groupIndex}>
						<ul className="space-y-2 font-medium">
							{group.menuItems.map((menuItem, menuIndex) => (
								<SidebarItem
								key={menuIndex}
								item={menuItem}
								pageName={pageName}
								setPageName={setPageName}
								/>
							))}
						</ul>
					</div>
				))}

				<ul className="mt-auto">
				{FootermenuGroups.map((group: { footermenuItems: ({ icon: JSX.Element; label: string; route: string; children: { label: string; route: string; }[]; } | { icon: JSX.Element; label: string; route: string; children?: undefined; })[]; }, groupIndex: Key | null | undefined) => (
					<li key={groupIndex}>
						{group.footermenuItems.map((menuItem, menuIndex) => (
							<SidebarItem
							key={menuIndex}
							item={menuItem}
							pageName={pageName}
							setPageName={setPageName}
							/>
						))}
					</li>
				))}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
