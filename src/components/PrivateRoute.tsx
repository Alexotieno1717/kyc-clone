"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Ensure code runs only on the client side
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("access_token"); // Get the access token
            if (!storedToken) {
                // If no token, redirect to sign-in page
                router.push("/auth/signin");
            } else {
                // If token is found, stop the loading state
                setIsLoading(false);
            }
        }
    }, [router]);

    if (isLoading) {
        // Render a loading spinner while checking for the token
        return <div className='h-screen flex justify-center items-center text-2xl font-medium'>loading....</div>;
    }

    return <>{children}</>; // Render the children (home page or any protected route)
};

export default PrivateRoute;
