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
                <div className="mt-12 overflow-x-auto space-y-6">
                    <div className='flex bg-white rounded-lg p-5 space-x-3 text-center'>
                        <h1>Total Credits: </h1>
                        <p className='text-2xl font-black'>{credits}</p>
                    </div>
                    <table className="w-full min-w-max table-auto text-left shadow-md rounded-md divide-y divide-gray-200">
                        <thead className="text-lg bg-gray-100 uppercase">
                        <tr>
                            <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">First Name</th>
                            <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">Other Name</th>
                            <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">Surname</th>
                            <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">ID Number</th>
                            <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">Serial Number</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 pl-2">{responseData.first_name}</td>
                            <td className="px-6 py-4 pl-2">{responseData.other_name}</td>
                            <td className="px-6 py-4 pl-2">{responseData.surname}</td>
                            <td className="px-6 py-4 pl-2">{responseData.id_number}</td>
                            <td className="px-6 py-4 pl-2">{responseData.serial_no}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default IdNumberForm;