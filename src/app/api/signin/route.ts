import { NextResponse } from 'next/server';
import axios from 'axios';

// Handle POST requests
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const response = await axios.post('http://161.35.6.91/bonga_api/auth', null, {
            params: {
                email,
                password,
                action: 'login',
            },
        });

        // Return response from the external API
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error('Error in API call:', error);

        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                { message: error.response?.data?.message || 'Internal Server Error' },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            { message: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
