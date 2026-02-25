"use client"

import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { CheckCircle2, Eye } from 'lucide-react';
import Table from "@/components/tables/table";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import {ErrorAlert, SuccessAlert} from "@/utils/alerts";

interface Data {
    id: number;
    client: string;
    searched_value: number;
    status: number;
    transaction_type_id: number;
    updated_at: string;
}

export default function DataTable() {
    const [data, setData] = useState<Data[]>([]);
    const [filteredData, setFilteredData] = useState<Data[]>([]);

    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
    });

    const statusPill = (status: number | string) => {
        const numeric = Number(status);
        const isOk = numeric === 1 || String(status).toLowerCase() === "success";

        return (
            <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${
                isOk ? "bg-emerald-100 text-emerald-700" : "bg-red-500/15 text-red-900"
            }`}>
                {isOk ? "Success" : String(status)}
            </span>
        );
    };

    // Fetch data from the JSON file
    useEffect(() => {

        // Retrieve kyc_token from localStorage
        const storageData = localStorage.getItem("kyc_auth");
        const kycToken = storageData ? JSON.parse(storageData).kyc_token : null;

        fetch(`https://app.bongasms.co.ke/api/kyc-transactions?kyc_token=${kycToken}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.data);
                setFilteredData(data.data); // Initialize filtered data
                // console.log(data.data);
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
            });
    }, []);

    // Function to format date
    const formatDate = (date: string | Date | null) => {
        if (!date) return '';
        return new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date(date));
    };


    // Function to filter data based on date range
    const filterDataByDate = () => {
        if (!value?.startDate || !value?.endDate) {
            setFilteredData(data); // Reset if no filter is applied
            ErrorAlert('Pick the dates before filtering');
            return;
        }

        const start = new Date(value.startDate).getTime();
        const end = new Date(value.endDate).getTime();

        const filtered = data.filter((item) => {
            const itemDate = new Date(item.updated_at).getTime();
            return itemDate >= start && itemDate <= end;
        });

        if (filtered.length === 0) {
            ErrorAlert(`No data found between ${formatDate(value.startDate)} and ${formatDate(value.endDate)}`);
            setFilteredData([]); // Clear the table
            return;
        }

        setFilteredData(filtered);
        SuccessAlert(`${filtered.length} Data found successfully.`);
    };



    // Table columns
    const columns = React.useMemo<ColumnDef<Data>[]>(
        () => [
            {
                id: 'id', // Unique ID for the column
                header: '#',
                cell:(props)=>{

                    return props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row)+1;
                }
            },
            {
                accessorKey: 'client',
                header: 'Client',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: (info) => statusPill(info.getValue() as number | string),
            },
            {
                accessorKey: 'transaction_type_id',
                header: 'Transaction Type',
                cell: () => <span className="text-slate-700">ID Search</span>,
            },
            {
                accessorKey: 'searched_value',
                header: 'searched value',
                cell: (info) => (
                    <span className="font-medium text-slate-800">{String(info.getValue() ?? "-")}</span>
                ),
            },
            {
                accessorKey: 'updated_at',
                header: 'Updated At',
                cell: (info) => (
                    <span className="text-slate-600">{formatDate(info.getValue() as string)}</span>
                ),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: () => (
                    <div className="flex text-center justify-center space-x-2">
                        <Button variant="ghost" size="icon" className="rounded-full bg-slate-100 hover:bg-slate-200">
                            <Eye className='size-4 text-slate-700' />
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <div>
            {/* Date Range Picker and Filter Button */}
            <div className="mb-5 rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50/40 p-3 shadow-sm md:p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-9">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Date Range</p>
                        <Datepicker
                            value={value}
                            onChange={setValue}
                            showShortcuts
                            inputClassName={"w-full rounded-xl bg-white py-2.5 pl-4 text-slate-700 shadow-sm ring-1 ring-slate-200"}
                            primaryColor={"blue"}
                        />
                    </div>
                    <div className="md:col-span-3">
                        <button
                            type="submit"
                            onClick={filterDataByDate}
                            disabled={!value?.startDate || !value?.endDate}  // Disable if no date is selected
                            className={`h-11 w-full rounded-xl px-6 text-sm font-semibold text-white shadow-sm transition duration-200 focus:outline-none ${
                                !value?.startDate || !value?.endDate
                                    ? "cursor-not-allowed bg-slate-300"
                                    : "bg-primary hover:bg-blue-400"
                            }`}
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Filter by start and end date to narrow records.
                </div>
            </div>

            {/* Table */}
            {/*<Table columns={columns} data={filteredData} />*/}
            <Table columns={columns} data={filteredData.length ? filteredData : data} />
        </div>
    );
}
