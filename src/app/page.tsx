"use client"
import Header from "@/components/ui/Header";
import React, {useState} from "react";
import axios from "axios";
import {ErrorAlert, SuccessAlert} from "@/utils/alerts";
import {ResponseData} from "@/types";
import IdNumberForm from "@/components/IdNumberForm";
import UserDetailsForm from "@/components/UserDetailsForm";
import {useRouter} from "next/navigation";
import AsideNav from "@/components/ui/AsideNav";
import PrivateRoute from "@/components/PrivateRoute";


export default function Home() {

    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [idNumber, setIdNumber] = useState('');
    const [activeTab, setActiveTab] = useState("idNumber");
    const [credits, setCredits] = useState<number>(0);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Retrieve kyc_token from localStorage
            const storageData = localStorage.getItem("kyc_auth");
            const kycToken = storageData ? JSON.parse(storageData).kyc_token : null;
    
            if (!kycToken) {
                ErrorAlert("KYC Token is missing. Please log in again.");
                return router.push("/auth/signin");
            }
    
            // Send ID number and KYC token to backend API with a timeout
            const response = await axios.post(
                "/api/kyc", 
                { idNumber, kycToken },
                { timeout: 300000 } // 50 seconds timeout
            );
    
            setCredits(response.data.credits);
            const data: ResponseData = response.data.search_result;
    
            // Check if the response contains matching ID details
            if (data && String(data.id_number) === String(idNumber)) {
                setResponseData(data);
                SuccessAlert(response.data.status_message);
            } else {
                ErrorAlert(response.data.status_message);
                setResponseData(null);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
                ErrorAlert("Request timed out. Please try again.");
            } else {
                console.error(error);
                ErrorAlert("Failed to fetch details. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
    <PrivateRoute>
        <Header />
        <div className="mx-auto max-w-7xl bg-gray-100 border border-gray-100 rounded-xl">
            <div className="grid grid-cols-12 gap-6">
                <AsideNav responseData={responseData} />
                <div className="col-span-12 px-8 md:col-span-9 md:px-0">
                    <div className="flex justify-center py-4">
                        <div className="flex items-center bg-blue-400 rounded-full">
                            <button
                                className={`px-6 py-3 rounded-full ${
                                    activeTab === "idNumber"
                                        ? "bg-white text-gray-900"
                                        : "bg-transparent text-white"
                                }`}
                                onClick={() => setActiveTab("idNumber")}
                            >
                                ID Number
                            </button>
                            <button
                                className={`px-6 py-3 rounded-full ${
                                    activeTab === "userDetails"
                                        ? "bg-white text-gray-900"
                                        : "bg-transparent text-white"
                                }`}
                                onClick={() => setActiveTab("userDetails")}
                            >
                                Phone Verification
                            </button>
                        </div>
                    </div>

                    <div>
                        {activeTab === "idNumber" && (
                            <IdNumberForm
                                handleSubmit={handleSubmit}
                                credits={credits}
                                setIdNumber={setIdNumber}
                                responseData={responseData}
                                loading={loading}
                            />
                        )}
                        {activeTab === "userDetails" && <UserDetailsForm loading={loading}/>}
                    </div>

                </div>
            </div>
        </div>
    </PrivateRoute>
    );
}
