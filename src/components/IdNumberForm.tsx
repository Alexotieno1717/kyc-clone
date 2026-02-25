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
    const [dob, setDOB] = useState('');
    const [loading, setLoading] = useState(false);

    const safeValue = (value?: string | number | null) => {
        if (value === undefined || value === null || value === "") return "N/A";
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const renderDetailsModal = async (data: ResponseData) => {
        const imageSrc = data.photo
            ? `data:image/jpeg;base64,${data.photo}`
            : data.gender === "M"
                ? "/male.svg"
                : "/female.svg";

        await Swal.fire({
            title: "Identity Match Result",
            html: `
                <div style="text-align:left;">
                    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:0.35rem 0 1rem;border-bottom:1px solid #e2e8f0;">
                        <img
                            src="${imageSrc}"
                            alt="User profile"
                            style="width:88px;height:88px;border-radius:14px;object-fit:cover;background:#f8fafc;border:1px solid #e2e8f0;"
                        />
                        <div>
                            <p style="margin:0;font-size:1.02rem;font-weight:700;color:#0f172a;">
                                ${safeValue(`${data.first_name ?? ""} ${data.other_name ?? ""} ${data.surname ?? ""}`.trim())}
                            </p>
                            <p style="margin:0.35rem 0 0;font-size:0.83rem;color:#475569;">
                                ID: ${safeValue(data.id_number)}
                            </p>
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.65rem 1rem;padding-top:1rem;">
                        <div><strong>First Name:</strong> ${safeValue(data.first_name)}</div>
                        <div><strong>Other Name:</strong> ${safeValue(data.other_name)}</div>
                        <div><strong>Surname:</strong> ${safeValue(data.surname)}</div>
                        <div><strong>Serial Number:</strong> ${safeValue(data.serial_number)}</div>
                        <div><strong>Gender:</strong> ${safeValue(data.gender === "M" ? "Male" : data.gender === "F" ? "Female" : "")}</div>
                        <div><strong>Date of Birth:</strong> ${safeValue(data.date_of_birth)}</div>
                        <div style="grid-column:1 / -1;"><strong>Citizenship:</strong> ${safeValue(data.citizenship)}</div>
                    </div>
                </div>
            `,
            confirmButtonText: "Close",
            showCloseButton: true,
            width: 760,
            customClass: {
                popup: "rounded-2xl",
                confirmButton: "swal2-confirm",
            },
        });
    };

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

            const response = await axios.post(
                "/api/kyc",
                { idNumber, serialNumber, dob, kycToken },
                { timeout: 300000 }
            );

            const data: ResponseData = response.data.search_result;

            if (data && String(data.id_number) === String(idNumber)) {
                refreshData(); // Refresh queries after successful search
                await renderDetailsModal(data);
            } else {
                await Swal.fire({
                    title: "No Match Found",
                    icon: "info",
                    text: `We couldn’t get any result for ID number ${idNumber}.`,
                });
            }
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
                    text: `Could not complete ID search for ${idNumber}. Please retry.`,
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
                    <h3 className="text-lg font-semibold text-slate-900">Verify by ID Number</h3>
                    <p className="mt-1 text-sm text-slate-600">
                        Enter details below to search and view results in a full identity modal.
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
                        />
                    </div>
                    <div className="md:col-span-3">
                        <label htmlFor="dob" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Date Of Birth
                        </label>
                        <input
                            id="dob"
                            type="date"
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}
                            className="flex h-11 w-full rounded-xl border border-slate-300 bg-background px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-1"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Button
                            className="mt-0 h-11 w-full rounded-xl bg-primary text-white hover:bg-blue-400"
                            type="submit"
                            disabled={loading}
                            onClick={async () => {
                                if (!idNumber.trim()) {
                                    await Swal.fire({
                                        title: "ID Number Required",
                                        icon: "info",
                                        text: "Please enter an ID Number before searching.",
                                    });
                                }
                            }}
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
