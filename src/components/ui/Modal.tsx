import React from "react";
import {ResponseData} from "@/types";

interface ModalProps {
    setIsOpen: (isOpen: boolean) => void;
    responseData: ResponseData | null,
    loading: boolean,
    credits?: number
}

export const Modal: React.FC<ModalProps> = ({ setIsOpen, responseData, loading, credits }) => {

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click is on the overlay (not inside the modal content)
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };


    return (
        <>
            <div
                className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50"
                onClick={handleOverlayClick}
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-LG font-bold flex-grow">SHOWING DETAILS OF {responseData && !loading ? ( responseData.first_name) : ( !loading )} </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-2 py-1 text-gray-600 text-lg rounded hover:text-black"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <hr/>

                    <main className='py-6'>
                        {responseData && !loading ? (
                            <div className="mt-4 space-y-6">
                                {/* Card Section */}
                                <div className="flex flex-row justify-start rounded-[10px] bg-[rgba(220,241,254,100%)] px-6 py-5 gap-x-5 max-w-[800px] mx-auto">
                                    <img src="/assets/images/sender-id-3.png" className="w-[76px] h-[76px]" alt="logo showcasing" />
                                    <div className="space-y-1 pt-2">
                                        <h2 className="font-bold text-xl text-[#171725]">Total Credits:</h2>
                                        <p className="font-normal text-3xl text-[#344054]">{credits}</p>
                                    </div>
                                </div>

                                {/* Content for Small Screens */}
                                <div className="w-full bg-white rounded-lg shadow-md p-6 space-y-6 max-w-[800px] mx-auto">
                                    <div className="flex space-x-6">
                                        <h1>First Name:</h1>
                                        <p>{responseData.first_name}</p>
                                    </div>
                                    <div className="flex space-x-6">
                                        <h1>Other Name:</h1>
                                        <p>{responseData.other_name}</p>
                                    </div>
                                    <div className="flex space-x-6">
                                        <h1>Surname:</h1>
                                        <p>{responseData.surname}</p>
                                    </div>
                                    <div className="flex space-x-6">
                                        <h1>ID Number:</h1>
                                        <p>{responseData.id_number}</p>
                                    </div>
                                    <div className="flex space-x-6">
                                        <h1>Serial Number:</h1>
                                        <p>{responseData.serial_no || "Null"}</p>
                                    </div>
                                </div>

                            </div>
                        ) : (

                            !loading
                        )}

                    </main>

                    <hr/>

                    <div className="flex items-center justify-end py-4">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-2 py-1 border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-600 hover:text-white transition-all "
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
