import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ErrorAlert, SuccessAlert } from "@/utils/alerts";
import axios from "axios";
import { ResponseData } from "@/types";
import Swal from "sweetalert2";

interface IdNumberFormProps {
    refreshData: () => void;
}

const IdNumberForm: React.FC<IdNumberFormProps> = ({ refreshData }) => {
    const [idNumber, setIdNumber] = useState('');
    const [loading, setLoading] = useState(false);
    // const [responseData, setResponseData] = useState<ResponseData | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const storageData = localStorage.getItem("kyc_auth");
            const kycToken = storageData ? JSON.parse(storageData).kyc_token : null;

            if (!kycToken) {
                ErrorAlert("KYC Token is missing. Please log in again.");
                return;
            }

            const response = await axios.post(
                "/api/kyc",
                { idNumber, kycToken },
                { timeout: 300000 }
            );

            const data: ResponseData = response.data.search_result;

            if (data && String(data.id_number) === String(idNumber)) {
                // setResponseData(data);
                SuccessAlert(response.data.status_message);
                refreshData(); // Refresh queries after successful search

                // Show data in SweetAlert
                const imageSrc = data.photo
                    ? `data:image/jpeg;base64,${data.photo}`
                    : data.gender === "M"
                        ? "/male.svg"
                        : "/female.svg";

                Swal.fire({
                    title: '',
                    html: `
                    <div style="
                      display: flex;
                      flex-direction: row;
                      gap: 3rem;
                      background: white;
                      border-radius: 8px;
                      text-align: left;
                      justify-content: center;
                      align-items: flex-start;
                    ">
                      <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; padding-top: 30px;">
                        <img 
                          src="${imageSrc}" 
                          alt="User Image" 
                          style="width: 180px; height: 180px; object-fit: contain; border-radius: 8px; background: #f3f3f3;" 
                        />
                        <p style="font-weight: bold; font-size: 1.1rem;">
                          ${data.first_name} ${data.other_name} ${data.surname}
                        </p>
                      </div>
                
                      <div style="display: flex; flex-direction: column; gap: 0.5rem; padding-top: 1.5rem;">
                        ${[
                                        { label: "First Name", value: data.first_name },
                                        { label: "Other Name", value: data.other_name },
                                        { label: "Surname", value: data.surname },
                                        { label: "ID Number", value: data.id_number },
                                        { label: "Serial Number", value: data.serial_number || "Null" },
                                        { label: "Gender", value: data.gender === "M" ? "Male" : data.gender === "F" ? "Female" : "Null" },
                                        { label: "Date of Birth", value: data.date_of_birth || "Null" },
                                        { label: "Citizenship", value: data.citizenship || "Null" },
                                    ].map(
                                        (item) => `
                            <div style="display: flex;">
                              <span style="width: 150px; font-weight: bold;">${item.label}:</span>
                              <span>${item.value}</span>
                            </div>
                          `
                                    ).join("")}
                      </div>
                    </div>
                  `,
                    showConfirmButton: false,
                    width: 700,
                    background: "#fff",
                    customClass: {
                        popup: 'rounded-xl shadow-md',
                    }
                });



            } else {
                // ErrorAlert(response.data.status_message);
                swal({
                    title: "No data was Found",
                    icon: "info",
                    text: `Opps! We couldn’t get any result for the ID number ${idNumber}`,
                    dangerMode: false,
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
                ErrorAlert("Request timed out. Please try again.");
            } else {
                console.error(error);
                swal({
                    title: "No data was Found",
                    icon: "info",
                    text: `Opps! We couldn’t get any result for the ID number ${idNumber}`,
                    dangerMode: false,
                });
            }
        } finally {
            setLoading(false);
        }
    };



    return (
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
                        }
                    }}
                >
                    {loading ? "Loading..." : "Search"}
                </Button>
            </form>

        </div>
    );
};

export default IdNumberForm;
