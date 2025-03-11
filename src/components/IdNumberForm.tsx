import {ResponseData} from "@/types";
import React from "react";

function IdNumberForm({
                          responseData,
                          loading,
                          credits
                      }: {
    responseData: ResponseData | null,
    loading: boolean,
    credits?: number
}) {
    return (
        <main className="max-w-2xl">

            {responseData && !loading ? (
                <div className="mt-12 space-y-6">
                    {/* Card Section */}
                    <div className="flex flex-row justify-start rounded-[10px] bg-[rgba(220,241,254,100%)] px-6 py-5 gap-x-5 max-w-[800px] mx-auto">
                        <img src="/assets/images/sender-id-3.png" className="w-[76px] h-[76px]" alt="logo showcasing" />
                        <div className="space-y-1 pt-2">
                            <h2 className="font-bold text-xl text-[#171725]">Total Credits:</h2>
                            <p className="font-normal text-3xl text-[#344054]">{credits}</p>
                        </div>
                    </div>

                    {/* Content for Small Screens */}
                    <div className="md:hidden w-full bg-white rounded-lg shadow-md p-6 space-y-6 max-w-[800px] mx-auto">
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
                            <p>{responseData.serial_number || "Null"}</p>
                        </div>
                    </div>

                </div>
            ) : (

                !loading
            )}
        </main>
    );
}

export default IdNumberForm;