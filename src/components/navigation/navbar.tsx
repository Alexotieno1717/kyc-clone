import Image from "next/image";
import {
	Cloud,
	LifeBuoy,
	LogOut,
	X,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface INavbarProps {
	sidebarOpen: boolean;
	toggleSidebar: () => void;
}

const Navbar = ({ sidebarOpen, toggleSidebar }: INavbarProps) => {

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userName, setUserName] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		// Ensure this runs only on the client-side
		if (typeof window !== "undefined") {
			const user = localStorage.getItem("user");
			if (user) {
				setIsAuthenticated(true);
				const userData = JSON.parse(user);
				setUserName(userData.client_name); // Assuming the user object has a 'name' property
			}
		}
	}, []); // Empty dependency array ensures this runs only once after the component is mounted

	const handleLogout = () => {
		// Clear localStorage data
		localStorage.removeItem('user');
		localStorage.removeItem('kyc_auth');
		localStorage.removeItem('access_token');

		// Redirect to Sign In page
		router.push("/auth/signin");

		// Optionally update local state
		setIsAuthenticated(false);
		setUserName("");
	};


	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start rtl:justify-end">
						<button
							data-drawer-target="logo-sidebar"
							data-drawer-toggle="logo-sidebar"
							aria-controls="logo-sidebar"
							type="button"
							className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
							onClick={toggleSidebar}
						>
							<span className="sr-only">Open sidebar</span>
							{sidebarOpen ? (
								<X className="w-6 h-6 text-gray-500" />
							) : (
								<svg
									className="w-6 h-6"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
									></path>
								</svg>
							)}
						</button>
						<Link href="/dashboard/home" className="flex ms-2 md:me-24">
							<Image
								src={"/assets/icons/bongasms-logo.png"}
								width={129}
								height={42}
								alt="BongaSMS logo"
								className="mx-auto"
							/>
						</Link>
					</div>
					<div className="flex items-center">

						{!isAuthenticated && (
							<Link href="/auth/signin">Sign In</Link>
						)}

						{isAuthenticated && (
							<>
								<ul className='flex'>
									<li className=" text-sm font-medium  py-2">
										Welcome, <span className="font-bold">{userName}</span>!
									</li>
									<li>
										<button
											onClick={handleLogout}
											className=" rounded-md px-3 py-2 text-sm font-medium"
										>
											Log Out
										</button>
									</li>
								</ul>
							</>
						)}


						<div className="flex items-center ms-4 z-50 bg-white">
							<DropdownMenu >
								<DropdownMenuTrigger asChild>
									<button className="border-0 border-none p-0 !focus:outline-none">
										<span className="sr-only">Open user menu</span>
										<img
											className="w-10 h-10 rounded-full"
											src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											alt="user photo"
										/>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56 me-4 bg-white border-none shadow-md">
									{isAuthenticated && (
										<DropdownMenuLabel>{userName}</DropdownMenuLabel>
									)}
									<DropdownMenuSeparator />
									<DropdownMenuItem disabled>
										<LifeBuoy className="mr-2 h-4 w-4" />
										<span>Support</span>
									</DropdownMenuItem>
									<Link href="https://app.bongasms.co.ke/clients/developer" target="_blank">
										<DropdownMenuItem className='cursor-pointer'>
											<Cloud className="mr-2 h-4 w-4" />
											<span>Developer Hub</span>
										</DropdownMenuItem>
									</Link>
									<DropdownMenuSeparator />
									<button onClick={handleLogout}>
										<DropdownMenuItem className='cursor-pointer'>
											<LogOut className="mr-2 h-4 w-4" />
											<span>Log out</span>
										</DropdownMenuItem>
									</button>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
