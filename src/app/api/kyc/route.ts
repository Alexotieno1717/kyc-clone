import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// API route handler for POST requests
export async function POST(req: NextRequest) {
    try {
        // Parse the incoming request body
        const body = await req.json();
        const { idNumber, serialNumber, dob, kycToken } = body;

        // Validate required inputs
        if (!idNumber || !kycToken || !serialNumber || !dob) {
            return NextResponse.json({ message: "ID Number and KYC Token are required." });
        }

        // External KYC API URL
        // const apiUrl = `https://app.bongasms.co.ke/api/kyc?search_type=id_search`;
        const apiUrl = `https://app.bongasms.co.ke/api/kyc`;

        // Make a GET request to the KYC API with query params
        const response = await axios.get(apiUrl, {
            params: {
                kyc_token: kycToken,
                search_param: idNumber,
                serial_number: serialNumber,
                date_of_birth: dob,
            },
        });

        // Return the KYC API response
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("KYC API Error:", error);
    }
}
