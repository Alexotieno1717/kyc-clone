"use client"

import OverviewCards from "@/components/OverviewCards";
import PrivateRoute from "@/components/PrivateRoute";
import React, {useEffect, useState} from "react";
import {ErrorAlert} from "@/utils/alerts";
import {useRouter} from "next/navigation";
import UserDetailsForm from "@/components/UserDetailsForm";
import IdNumberForm from "@/components/IdNumberForm";


const Home = () => {
    const [credits, setCredits] = useState<number | null>(null);
    const [queries, setQueries] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("idNumber");

    const router = useRouter();

    const fetchData = async () => {
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    const overviewValues = [
        { title: "queries today", amount: queries !== null ? queries : 0},
        { title: "credits balance", amount: credits !== null ? credits : 0 },
    ];

    return (
        <PrivateRoute>
            <div className="pt-8 mt-12 space-y-4 md:p-4">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-4xl text-[#171725] leading-10">Dashboard</h1>
                </div>
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-2">
                    {overviewValues.map((item, index: number) => (
                        <OverviewCards
                            key={index}
                            title={item.title}
                            amount={item.amount}
                        />
                    ))}
                </div>


                {/* Tabs for switching between id number and user details */}
                <div>
                    <div className="inline-flex h-9 py-10 items-center justify-center rounded-lg bg-muted  text-muted-foreground">
                        <div
                            className={`
                                inline-flex cursor-pointer items-center justify-center whitespace-nowrap px-10 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow border border-gray-300                        ${
                                activeTab === "idNumber"
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-500"
                            }`}
                            onClick={() => setActiveTab("idNumber")}
                        >
                            ID Number
                        </div>

                        <div
                            className={`inline-flex cursor-pointer items-center justify-center whitespace-nowrap px-10 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow border border-gray-300
                                    ${
                                activeTab === "userDetails"
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-500"
                            }`}
                            onClick={() => setActiveTab("userDetails")}
                        >
                            User Details
                        </div>
                    </div>
                </div>

                {/* Tabs Data */}
                <div>
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