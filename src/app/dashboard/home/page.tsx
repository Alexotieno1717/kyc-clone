"use client"

import OverviewCards from "@/components/OverviewCards";
import PrivateRoute from "@/components/PrivateRoute";
import React, {useCallback, useEffect, useState} from "react";
import {ErrorAlert} from "@/utils/alerts";
import {useRouter} from "next/navigation";
import UserDetailsForm from "@/components/UserDetailsForm";
import IdNumberForm from "@/components/IdNumberForm";

type OverviewItem = {
    id: string
    title: string
    amount: number
}

const Home = () => {
    const [credits, setCredits] = useState<number | null>(null);
    const [queries, setQueries] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("idNumber");

    const router = useRouter();

    const fetchData = useCallback(async () => {
        const storageData = localStorage.getItem("kyc_auth");
        const kycToken = storageData ? JSON.parse(storageData).kyc_token : null;

        if (!kycToken) {
            ErrorAlert("KYC Token is missing. Please log in again.");
            return router.push("/auth/signin");
        }

        try {
            const response = await fetch(`https://app.bongasms.co.ke/api/kyc-report?kyc_token=${kycToken}`);
            const data = await response.json();

            setCredits(data.data.kyc_credit_balance);
            setQueries(data.data.total_transactions);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [router]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // const overviewValues = [
    //     { id: "queries-today", title: "queries today", amount: queries !== null ? queries : 0},
    //     { id: "credits-balance", title: "credits balance", amount: credits !== null ? credits : 0 },
    // ];

    const overviewValues: OverviewItem[] = [
        { id: "queries-today", title: "queries today", amount: queries ?? 0 },
        { id: "credits-balance", title: "credits balance", amount: credits ?? 0 },
    ]

    return (
        <PrivateRoute>
            <div className="relative mx-auto mt-10 max-w-9xl space-y-6 px-1 pb-8 pt-6 sm:mt-12 md:px-4">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 rounded-3xl"
                    style={{ background: "radial-gradient(95% 90% at 0% 0%, rgba(14,165,233,0.22) 0%, rgba(15,23,42,0) 72%), radial-gradient(90% 90% at 100% 0%, rgba(34,197,94,0.18) 0%, rgba(15,23,42,0) 70%)" }}
                />

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm md:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                            KYC Workspace
                        </p>
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Live Sync
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-12 md:items-end">
                        <div className="md:col-span-7">
                            <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">Dashboard Home</h1>
                            <p className="mt-2 max-w-xl text-xs text-slate-400 md:text-sm">
                                Track your verification activity, monitor usage, and run instant identity checks in one clean workflow.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {overviewValues.map((item:{
                        id:string;
                        title:string;
                        amount:number;
                    }) => (
                        <OverviewCards
                            key={item.id}
                            cardKey={item.id}
                            title={item.title}
                            amount={item.amount}
                        />
                    ))}
                </div>


                {/* Tabs for switching between id number and user details */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
                    <p className="mb-3 text-sm font-semibold text-slate-700">Choose Verification Type</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            className={`group rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                                activeTab === "idNumber"
                                    ? "border-sky-300 bg-sky-50 shadow-sm ring-1 ring-sky-200"
                                    : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/40"
                            }`}
                            onClick={() => setActiveTab("idNumber")}
                        >
                            <p className={`text-sm font-semibold ${activeTab === "idNumber" ? "text-sky-800" : "text-slate-800"}`}>
                                ID Number Lookup
                            </p>
                            <p className={`mt-1 text-xs ${activeTab === "idNumber" ? "text-sky-700" : "text-slate-500"}`}>
                                Verify a person using national ID details.
                            </p>
                        </button>

                        <button
                            type="button"
                            className={`group rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                                activeTab === "userDetails"
                                    ? "border-emerald-300 bg-emerald-50 shadow-sm ring-1 ring-emerald-200"
                                    : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40"
                            }`}
                            onClick={() => setActiveTab("userDetails")}
                        >
                            <p className={`text-sm font-semibold ${activeTab === "userDetails" ? "text-emerald-800" : "text-slate-800"}`}>
                                User Details Match
                            </p>
                            <p className={`mt-1 text-xs ${activeTab === "userDetails" ? "text-emerald-700" : "text-slate-500"}`}>
                                Cross-check details using ID and phone number.
                            </p>
                        </button>
                    </div>
                </div>

                {/* Tabs Data */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
                    {activeTab === "idNumber" && (
                        <IdNumberForm refreshData={fetchData} />
                    )}
                    {activeTab === "userDetails" && <UserDetailsForm />}
                </div>

            </div>
        </PrivateRoute>
    );
};

export default Home;
