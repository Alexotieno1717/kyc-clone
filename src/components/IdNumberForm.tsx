import {Button} from "@/components/ui/button";
import {ResponseData} from "@/types";
import React from "react";

function IdNumberForm({
                          handleSubmit,
                          setIdNumber,
                          responseData,
                          loading,
                          credits
                      }: {
    handleSubmit: (e: React.FormEvent) => void,
    setIdNumber: React.Dispatch<React.SetStateAction<string>>,
    responseData: ResponseData | null,
    loading: boolean,
    credits?: number
}) {
    return (
        <main className="max-w-2xl">
            <form onSubmit={handleSubmit} className="max-w-2xl flex items-center space-x-4">
                <div className="flex-grow">
                    <input
                        type="number"
                        min={0}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder="Enter your ID Number"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    />
                </div>
                <Button className="mt-0 bg-blue-400 text-white" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Search"}
                </Button>
            </form>

            {responseData && (
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
                            <p>{responseData.serial_no || "Null"}</p>
                        </div>
                    </div>
            
                    {/* Content for Medium and Larger Screens */}
                    <table className="hidden md:table w-full bg-white shadow-md rounded-md border border-gray-200">
                        <thead className="text-sm bg-gray-100 text-gray-600 uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium border-b">First Name</th>
                                <th className="px-4 py-3 text-left font-medium border-b">Other Name</th>
                                <th className="px-4 py-3 text-left font-medium border-b">Surname</th>
                                <th className="px-4 py-3 text-left font-medium border-b">ID Number</th>
                                <th className="px-4 py-3 text-left font-medium border-b">Serial Number</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            <tr>
                                <td className="px-4 py-3 border-b">{responseData.first_name}</td>
                                <td className="px-4 py-3 border-b">{responseData.other_name}</td>
                                <td className="px-4 py-3 border-b">{responseData.surname}</td>
                                <td className="px-4 py-3 border-b">{responseData.id_number}</td>
                                <td className="px-4 py-3 border-b">{responseData.serial_no || "Null"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default IdNumberForm;