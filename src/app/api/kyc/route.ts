import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// API route handler for POST requests
export async function POST(req: NextRequest) {
    try {
        // Parse the incoming request body
        const body = await req.json();
        const { idNumber, kycToken } = body;

        // Validate required inputs
        if (!idNumber || !kycToken) {
            return NextResponse.json({ message: "ID Number and KYC Token are required." }, { status: 400 });
        }

        // External KYC API URL
        const apiUrl = `https://app.bongasms.co.ke/api/kyc`;

        // Make a GET request to the KYC API with query params
        const response = await axios.get(apiUrl, {
            params: {
                kyc_token: kycToken,
                search_param: idNumber,
            },
        });

        // Return the KYC API response
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("KYC API Error:", error);
    }
}
