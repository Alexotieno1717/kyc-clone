"use client"

import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
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
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'transaction_type_id',
                header: 'Transaction Type',
                cell: "ID Search",
                // cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'searched_value',
                header: 'searched value',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'updated_at',
                header: 'Updated At',
                cell: (info) => formatDate(info.getValue() as string),
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: () => (
                    <div className="flex text-center justify-center space-x-2">
                        <Button variant="ghost" size="icon">
                            <Eye className='text-green-400 size-5' />
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
            <div className="inline-flex w-full items-center mb-4">
                <Datepicker
                    value={value}
                    onChange={setValue}
                    showShortcuts
                    inputClassName={"dark:text-gray-400 text-grey dark:bg-white w-full border border-gray-300 py-2 rounded-xl pl-4"}
                    primaryColor={"blue"}
                />
                <button
                    type="submit"
                    onClick={filterDataByDate}
                    disabled={!value?.startDate || !value?.endDate}  // Disable if no date is selected
                    className={`transition ease-in-out delay-150 duration-300 text-white font-medium rounded-xl text-base px-12 py-2.5 ml-4 focus:outline-none ${
                        !value?.startDate || !value?.endDate
                            ? "bg-gray-400 cursor-not-allowed"   // Grey out the button if disabled
                            : "bg-primary hover:bg-blue-400"
                    }`}
                >
                    Filter
                </button>

            </div>

            {/* Table */}
            {/*<Table columns={columns} data={filteredData} />*/}
            <Table columns={columns} data={filteredData.length ? filteredData : data} />
        </div>
    );
}
