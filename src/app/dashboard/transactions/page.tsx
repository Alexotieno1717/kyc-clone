"use client"

import PrivateRoute from "@/components/PrivateRoute";
import React from "react";
import DataTable from "@/components/tables/dataTable";


const Transactions = () => {

    return (
        <PrivateRoute>
            <div className="pt-8 mt-12 space-y-4 md:p-4">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-4xl text-[#171725] leading-10">Transaction History</h1>
                </div>

                <div className="">
                    <DataTable />
                </div>

            </div>
        </PrivateRoute>
    );
};

export default Transactions;