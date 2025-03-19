import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { idNumber, phoneNumber, kycToken } = body;

        console.log("Request Body:", body);

        if (!idNumber || !phoneNumber || !kycToken) {
            return NextResponse.json(
                { message: "ID Number, Phone Number, and KYC Token are required." },
                { status: 400 }
            );
        }

        const apiUrl = `https://app.bongasms.co.ke/api/kyc`;

        const response = await axios.get(apiUrl, {
            params: {
                kyc_token: kycToken,
                search_param: idNumber,
                phone_number: phoneNumber,
                search_type: "phone_verification",
            },
            timeout: 10000,
        });

        console.log("KYC API Response:", response.data);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("KYC API Error:", error || error);

        return NextResponse.json(
            { message: "Failed to connect to KYC API", error: error },
            { status: 500 }
        );
    }
}
