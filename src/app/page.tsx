"use client"
import React from "react";
import PrivateRoute from "@/components/PrivateRoute";
import {redirect} from "next/navigation";



export default function Home() {

    redirect('/dashboard/home')

    return (
    <PrivateRoute>
        <div className="p-4 sm:ml-72">
            <div className="pt-8 mt-12 space-y-4 md:p-4">
                <h1>Home</h1>
            </div>
        </div>
    </PrivateRoute>
    );
}
