"use client"

import PrivateRoute from "@/components/PrivateRoute";
import React from "react";
import DataTable from "@/components/tables/dataTable";


const Transactions = () => {
    return (
        <PrivateRoute>
            <div className="relative mx-auto mt-10 max-w-7xl space-y-6 px-1 pb-8 pt-6 sm:mt-12 md:px-4">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 rounded-3xl"
                    style={{ background: "radial-gradient(95% 90% at 0% 0%, rgba(14,165,233,0.20) 0%, rgba(15,23,42,0) 72%), radial-gradient(90% 90% at 100% 0%, rgba(59,130,246,0.16) 0%, rgba(15,23,42,0) 70%)" }}
                />

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm md:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <p className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                            Transactions
                        </p>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">Transaction History</h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
                            Review lookup activity, filter by date range, and monitor verification operations.
                        </p>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm md:p-4">
                    <DataTable />
                </div>
            </div>
        </PrivateRoute>
    );
};

export default Transactions;
