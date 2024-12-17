"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Links = [
    {
        name: "Home",
        url: "/",
    },
];

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState<string>("");
    const router = useRouter();

    // Check if user is authenticated on component mount
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsAuthenticated(true);
            const userData = JSON.parse(user);
            setUserName(userData.client_name); // Assuming the user object has a 'name' property
        }
    }, []);

    // Handle logout functionality
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
        <>
            <nav className="bg-[#78B9E4] sticky top-0 z-50 mb-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-2 lg:px-2">
                    <div className="flex py-2 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    src="/bonga.png"
                                    alt="Your Company"
                                    className=""
                                />
                            </div>
                            <div className="hidden md:block">
                                <ul className="ml-10 flex items-baseline space-x-4">
                                    {Links.map((link, index) => (
                                        <li
                                            className="text-white rounded-md px-3 py-2 text-sm font-medium"
                                            key={index}
                                        >
                                            <Link href={link.url}>{link.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <ul className="flex items-baseline space-x-4">
                                    {!isAuthenticated && (
                                        <li className="text-white rounded-md px-3 py-2 text-sm font-medium">
                                            <Link href="/auth/signin">Sign In</Link>
                                        </li>
                                    )}
                                    {isAuthenticated && (
                                        <>
                                            <li className="text-white text-sm font-medium">
                                                Welcome, <span className="font-bold">{userName}</span>!
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="text-white rounded-md px-3 py-2 text-sm font-medium"
                                                >
                                                    Log Out
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                type="button"
                                onClick={() => setToggle(!toggle)}
                                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-700 ease-in-out"
                                aria-controls="mobile-menu"
                                aria-expanded={toggle}
                            >
                                <span className="sr-only">Open main menu</span>
                                {!toggle ? (
                                    <svg
                                        className="block h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {toggle && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {Links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className="bg-[#206A3F]/70 shadow-lg text-white block rounded-md px-3 py-2 text-base font-medium"
                                    aria-current="page"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Header;
