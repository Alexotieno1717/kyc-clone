"use client"

import OverviewCards from "@/components/OverviewCards";
import PrivateRoute from "@/components/PrivateRoute";
import React, {useState} from "react";
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
    const [cost, setCost] = useState<number | null>(null);

    const router = useRouter();

    // fetch contact from the json file
    // useEffect(() => {
    //     fetch('/resources.json')
    //         .then((response) => response.json())
    //         .then((data) =>{
    //             setApiResponse(data.data);
    //             // console.log(data.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching contacts:', error);
    //         })
    // }, [])




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
            setCost(response.data.cost ?? null);
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

    const overviewValues = [
        { title: "Client", amount: "Caritus" },
        { title: "Total queries today", amount: "40" },
        { title: "credits", amount: credits !== null ? credits.toString() : "0" },
        { title: "cost Ksh", amount: cost !== null ? cost.toString() : "0" },
    ];


    return (
        <PrivateRoute>
            <div className="pt-8 mt-12 space-y-4 md:p-4">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-4xl text-[#171725] leading-10">Dashboard</h1>
                </div>
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {overviewValues.map((item, index: number) => (
                        <OverviewCards
                            key={index}
                            title={item.title}
                            amount={item.amount}
                        />
                    ))}
                </div>

                <form onSubmit={handleSubmit}
                      // className="max-w-2xl flex items-center space-x-4"
                      className="max-w-3xl flex items-center space-x-4"
                >
                    <div className="flex-grow">
                        <input
                            type="number"
                            min={0}
                            value={idNumber} // Bind the input field to state
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

                {responseData && !loading ? (
                    <div className="flex flex-col md:flex-row md:space-x-12 border border-gray-200 bg-white shadow-md p-4 md:p-10">
                        <div className='space-y-4'>
                            <IprsImage base64String={responseData.photo ?? ""} />
                            <p className='font-bold'>{responseData.first_name} {responseData.other_name} {responseData.surname}</p>
                        </div>
                        <div className='py-8'>
                            <div className="flex space-x-6">
                                <h1 className='font-bold'>first_name:</h1>
                                <p>{responseData.first_name}</p>
                            </div>
                            <div className="flex space-x-6">
                                <h1 className='font-bold'>other_name:</h1>
                                <p>{responseData.other_name}</p>
                            </div>
                            <div className="flex space-x-6">
                                <h1 className='font-bold'>surname:</h1>
                                <p>{responseData.surname}</p>
                            </div>
                            <div className="flex space-x-6">
                                <h1 className='font-bold'>ID Number:</h1>
                                <p>{responseData.id_number}</p>
                            </div>
                            <div className="flex space-x-6">
                                <h1 className='font-bold'>Serial Number:</h1>
                                <p>{responseData.serial_number || "Null"}</p>
                            </div>
                            <div className="flex space-x-6">
                                <h1 className='font-bold'>Gender:</h1>
                                <p>{responseData.gender === "M" ? "Male" : responseData.gender === "F" ? "Female" : "Null"}</p>
                            </div>
                            <div className="flex space-x-6">
                                <h1 className='font-bold'>Date of Birth:</h1>
                                <p>{responseData.date_of_birth || "Null"}</p>
                            </div>
                            <div className="flex space-x-6">
                                <h1 className='font-bold'>Citizenship:</h1>
                                <p>{responseData.citizenship || "Null"}</p>
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>
        </PrivateRoute>
    );
};

export default Home;