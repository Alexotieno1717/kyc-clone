import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ResponseData } from "@/types";
import Swal from "sweetalert2";

interface IdNumberFormProps {
    refreshData: () => void;
}

const IdNumberForm: React.FC<IdNumberFormProps> = ({ refreshData }) => {
    const [idNumber, setIdNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const storageData = localStorage.getItem("kyc_auth");
            const kycToken = storageData ? JSON.parse(storageData).kyc_token : null;

            if (!kycToken) {
                await Swal.fire({
                    title: "Missing Session",
                    text: "KYC token is missing. Please sign in again.",
                    icon: "warning",
                });
                return;
            }

            if (!idNumber.trim() || !serialNumber.trim()) {
                await Swal.fire({
                    title: "Missing Details",
                    icon: "info",
                    text: "Please enter both ID Number and Serial Number before searching.",
                });
                return;
            }

            const response = await axios.post(
                "/api/kyc",
                { idNumber, serialNumber, kycToken },
                { timeout: 300000 }
            );

            const data: ResponseData | undefined = response.data.search_result;

            const matchesId = String(data?.id_number ?? "").trim() === idNumber.trim();
            const matchesSerial = String(data?.serial_number ?? "").trim() === serialNumber.trim();

            if (data && matchesId && matchesSerial) {
                refreshData();
                await Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: "ID number and serial number match.",
                });
                return;
            }

            await Swal.fire({
                title: "Does Not Match",
                icon: "warning",
                text: "The ID number and serial number do not match our records.",
            });
        } catch (error) {
            if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
                await Swal.fire({
                    title: "Request Timeout",
                    icon: "warning",
                    text: "The request took too long. Please try again.",
                });
            } else {
                console.error(error);
                await Swal.fire({
                    title: "Lookup Failed",
                    icon: "error",
                    text: `Could not complete ID lookup for ${idNumber}. Please retry.`,
                });
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="w-full max-w-5xl">
            <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50 p-4 md:p-5">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">ID Number Verification</h3>
                    <p className="mt-1 text-sm text-slate-600">
                        Enter the ID number and serial number to verify an exact match.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end md:gap-4">
                    <div className="md:col-span-4">
                        <label htmlFor="idNumber" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                            ID Number
                        </label>
                        <input
                            id="idNumber"
                            type="number"
                            min={0}
                            inputMode="numeric"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            placeholder="Enter your ID Number"
                            className="flex h-11 w-full rounded-xl border border-slate-300 bg-background px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-1"
                            required
                        />
                    </div>
                    <div className="md:col-span-3">
                        <label htmlFor="serialNumber" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Serial Number
                        </label>
                        <input
                            id="serialNumber"
                            type="text"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                            placeholder="Enter Serial Number"
                            className="flex h-11 w-full rounded-xl border border-slate-300 bg-background px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-1"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Button
                            className="mt-0 h-11 w-full rounded-xl bg-primary text-white hover:bg-blue-400"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IdNumberForm;
