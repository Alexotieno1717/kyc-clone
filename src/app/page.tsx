"use client"
import Header from "@/components/ui/Header";
import React, {useState} from "react";
import axios from "axios";
import {ErrorAlert, SuccessAlert} from "@/utils/alerts";
import {ResponseData} from "@/types";
import UserDetailsForm from "@/components/UserDetailsForm";
import {useRouter} from "next/navigation";
import AsideNav from "@/components/ui/AsideNav";
import PrivateRoute from "@/components/PrivateRoute";
import {Modal} from "@/components/ui/Modal";
import {Button} from "@/components/ui/button";
import IdNumberForm from "@/components/IdNumberForm";


export default function Home() {

    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [idNumber, setIdNumber] = useState('');
    const [activeTab, setActiveTab] = useState("idNumber");
    const [credits, setCredits] = useState<number>(0);
    const [isOpen, setIsOpen] = useState(false);
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
                { timeout: 300000 } // 5 minutes timeout
            );
    
            setCredits(response.data.credits);
            const data: ResponseData = response.data.search_result;
    
            // Check if the response contains matching ID details
            if (data && String(data.id_number) === String(idNumber)) {
                setResponseData(data);
                SuccessAlert(response.data.status_message);
            } else {
                ErrorAlert(response.data.status_message);
                setResponseData(null); // Reset data on failure
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
                ErrorAlert("Request timed out. Please try again.");
            } else {
                console.error(error);
                ErrorAlert("Result Not Found");
            }
            setResponseData(null); // Reset data on error
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setIdNumber(""); // Reset ID number input
        setResponseData(null); // Clear response data
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

                    <form onSubmit={handleSubmit} className="max-w-2xl flex items-center space-x-4">
                        <div className="flex-grow">
                            <input
                                type="number"
                                min={0}
                                value={idNumber} // Bind the input field to state
                                onChange={(e) => setIdNumber(e.target.value)}
                                placeholder="Enter your ID Number"
                                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                                required
                            />

                        </div>
                        <Button
                            className="mt-0 bg-blue-400 text-white"
                            type="submit"
                            disabled={loading}
                            onClick={() => {
                                if (!idNumber.trim()) {
                                    ErrorAlert("Please enter your ID Number before searching.");
                                    return;
                                }
                                setIsOpen(true);
                            }}
                        >
                            {loading ? "Loading..." : "Search"}
                        </Button>

                    </form>

                    <div className="hidden md:block">
                        {loading ?
                            ''
                            :
                            (
                                <div>
                                    {activeTab === "idNumber" && isOpen &&
                                        <Modal
                                            setIsOpen={handleCloseModal}
                                            credits={credits}
                                            responseData={responseData}
                                            loading={loading}
                                        />
                                    }
                                    {activeTab === "userDetails" && <UserDetailsForm loading={loading}/>}
                                </div>
                            )
                        }
                    </div>

                    <div className='md:hidden'>
                        {activeTab === "idNumber" && (
                            <IdNumberForm
                                credits={credits}
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
