import {Check} from "lucide-react";
import {ResponseData} from "@/types";
import React from "react";

interface AsideNavProps {
    responseData: ResponseData | null; // Explicitly declare the type as ResponseData | null
}

const AsideNav: React.FC<AsideNavProps> = ({ responseData }) => {
    return (
        <>
            <div
                className="col-span-3 relative overflow-hidden"
                style={{background: 'linear-gradient(to bottom, #78B9E4, #78B9E4, #78B9E4, white)'}}
            >
                <img
                    src="/sideimg.png"
                    alt="side image"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
                />
                <h1 className="text-2xl text-[#475467] font-extrabold text-center pt-4 pb-5 relative">KYC</h1>
                <div className="px-[63px] relative bg-transparent">
                    <h2 className="pb-3">Account</h2>
                    <div className="relative pb-[382px]">
                        <div className="absolute top-6 left-3 w-0.5 h-full bg-gray-300"></div>
                        <ul className="space-y-[100px]">
                            <li className="flex items-center space-x-4 relative z-10">
                      <span
                          className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-yellow-300 bg-yellow-300">
                          <Check className="w-5 h-5"/>
                      </span>
                                <span className="font-bold text-gray-800">User’s Details</span>
                            </li>
                            <li className={`flex items-center space-x-4 relative z-10`}>
                      <span
                          // className="w-6 h-6 rounded-full border-2 flex items-center justify-center "
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center  ${responseData ? 'border-yellow-300 bg-yellow-300' : 'border-black bg-black'}`}
                      >
                          <Check className="w-5 h-5"/>
                      </span>
                                <span className="font-bold text-gray-800">Verify</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AsideNav;