import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {ErrorAlert} from "@/utils/alerts";
import axios from "axios";
import swal from "sweetalert";

function UserDetailsForm() {

    const [idNumber, setIdNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Retrieve KYC Token from localStorage
            const storageData = localStorage.getItem("kyc_auth");
            const kycToken = storageData ? JSON.parse(storageData)?.kyc_token : null;

            if (!kycToken) {
                ErrorAlert("KYC Token is missing. Please log in again.");
                setLoading(false);
                return;
            }

            // Make API request
            const response = await axios.post(
                "/api/details",
                { idNumber, phoneNumber, kycToken },
                { timeout: 30000 }
            );

            // Ensure response data is valid
            if (!response?.data) {
                throw new Error("Invalid API response");
            }

            const { data, status_message } = response.data;

            // Validate API response structure
            if (!data) {
                // ErrorAlert(status_message || "Invalid response structure.");
                // ErrorAlert("Data Pass do not Match.");
                swal({
                    title: "Error",
                    icon: "error",
                    text: "Data pass do not match."
                });
                // console.error(status_message);
                // console.error("DATA Response Error:");
                // console.error("API Response Error:", response.data);
                return;
            }

            // Check if details match
            if (data.match) {
                // SuccessAlert(status_message || "Verification successful.");
                swal({
                    title: "Success",
                    icon: "success",
                    text: status_message || "Verification successful."
                });
                console.log("Success:", data);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="max-w-2xl">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="idNumber" className="block text-sm font-medium">
                        National ID
                    </label>
                    <input
                        type="number"
                        name='idNumber'
                        placeholder="Enter your ID Number"
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="flex h-10 w-full border border-gray-400 rounded-[8px] text-gray-500 focus:text-dark bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium">
                        Phone number
                    </label>
                    <input
                        type="number"
                        name='phoneNumber'
                        placeholder="Enter your Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex h-10 w-full border border-gray-400 rounded-[8px] text-gray-500 focus:text-dark bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                    />
                </div>
                <hr className='text-gray-300'/>
                <div className="flex items-end justify-end">
                    <Button className="mt-0 bg-blue-400 text-white" type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </div>
            </form>
        </main>
    );
}

export default UserDetailsForm;