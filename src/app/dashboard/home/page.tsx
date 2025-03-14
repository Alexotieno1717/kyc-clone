"use client"

import OverviewCards from "@/components/OverviewCards";
import PrivateRoute from "@/components/PrivateRoute";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {ErrorAlert, SuccessAlert} from "@/utils/alerts";
import axios from "axios";
import {ResponseData} from "@/types";
import {useRouter} from "next/navigation";
import IprsImage from "@/components/IprsImage";


const Home = () => {
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [idNumber, setIdNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [credits, setCredits] = useState<number | null>(null);
    const [queries, setQueries] = useState<number | null>(null);

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
            setQueries(data.data.total_transactions); // ✅ Set queries on page load
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

// ✅ Run fetchData when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // ✅ Empty dependency array to run only on mount

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const storageData = localStorage.getItem("kyc_auth");
            const kycToken = storageData ? JSON.parse(storageData).kyc_token : null;

            if (!kycToken) {
                ErrorAlert("KYC Token is missing. Please log in again.");
                return router.push("/auth/signin");
            }

            const response = await axios.post(
                "/api/kyc",
                { idNumber, kycToken },
                { timeout: 300000 }
            );

            const data: ResponseData = response.data.search_result;

            if (data && String(data.id_number) === String(idNumber)) {
                setResponseData(data);
                SuccessAlert(response.data.status_message);

                // ✅ Refresh queries after successful search
                fetchData();
            } else {
                ErrorAlert(response.data.status_message);
                setResponseData(null);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
                ErrorAlert("Request timed out. Please try again.");
            } else {
                console.error(error);
                ErrorAlert("Result Not Found");
            }
            setResponseData(null);
        } finally {
            setLoading(false);
        }
    };




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

                <div className="max-w-5xl w-full">
                    {/* Search Form */}
                    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                        <div className="flex-grow">
                            <input
                                type="number"
                                min={0}
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                                placeholder="Enter your ID Number"
                                className="flex h-10 w-full border border-gray-300 rounded-[8px] bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            />
                        </div>
                        <Button
                            className="mt-0 bg-primary hover:bg-blue-400 text-white rounded-[8px]"
                            type="submit"
                            disabled={loading}
                            onClick={() => {
                                if (!idNumber.trim()) {
                                    ErrorAlert("Please enter your ID Number before searching.");
                                    return;
                                }
                            }}
                        >
                            {loading ? "Loading..." : "Search"}
                        </Button>
                    </form>

                    {/* Data Display */}
                    <div className="w-full mt-4">
                        {responseData && !loading ? (
                            <div className="border border-gray-200 bg-white shadow-md p-4 flex flex-col md:flex-row md:space-x-12">
                                <div className="space-y-4">
                                    <IprsImage base64String={responseData.photo ?? ""} gender={responseData.gender} />
                                    <p className="font-bold">
                                        {responseData.first_name} {responseData.other_name} {responseData.surname}
                                    </p>
                                </div>

                                <div className="py-6 space-y-2">
                                    {[
                                        { label: "First Name", value: responseData.first_name },
                                        { label: "Other Name", value: responseData.other_name },
                                        { label: "Surname", value: responseData.surname },
                                        { label: "ID Number", value: responseData.id_number },
                                        { label: "Serial Number", value: responseData.serial_number || "Null" },
                                        { label: "Gender", value: responseData.gender === "M" ? "Male" : responseData.gender === "F" ? "Female" : "Null" },
                                        { label: "Date of Birth", value: responseData.date_of_birth || "Null" },
                                        { label: "Citizenship", value: responseData.citizenship || "Null" },
                                    ].map((item, index) => (
                                        <div key={index} className="flex">
                                            <h1 className="font-bold w-40">{item.label}:</h1>
                                            <p>{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>


            </div>
        </PrivateRoute>
    );
};

export default Home;