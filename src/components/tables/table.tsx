import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight } from "lucide-react";
import NotFound from "@/components/notfound/notFound";

interface ITableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
}

export default function Table<T>({ data, columns }: ITableProps<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    if (!data || data.length === 0) {
        return (
            <NotFound title={'data'} pathToCreate={'#'} />
        );
    }

    return (
        <div className="p-2 md:p-3">
            <div className="relative overflow-hidden bg-white shadow-[0_18px_60px_-35px_rgba(15,23,42,0.45)]">
                <div className="overflow-x-auto">
                <table id="react-table" className="w-full min-w-max border-separate [border-spacing:0_10px] table-auto text-left">
                    <thead className="bg-slate-900 text-lg uppercase">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200 md:text-xs"
                                    colSpan={header.colSpan}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="bg-white">
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className={`text-center text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                            index % 2 === 0 ? "" : ""
                        }`}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="whitespace-nowrap bg-slate-50 px-4 py-3.5 text-xs font-medium text-slate-700 md:text-sm">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>

            <div className="h-2 pt-5" />
            <div className="flex flex-col justify-between gap-3 pt-2 md:flex-row md:items-center">
                <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
                    {/* <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span> */}

                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className='rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition duration-200 focus:outline-none'
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>

                    <p className='flex items-center justify-center text-sm text-slate-500'>Entries Per Page</p>
                </div>

                <div className="flex items-center gap-2 md:pt-0">
                    <p className="mr-2 text-sm text-slate-500">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </p>
                    {/* <button
              className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'Start'}
            </button> */}
                    <button
                        className='inline-flex items-center gap-1 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 focus:outline-none hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        {'Previous'}
                    </button>

                    <button
                        className='inline-flex items-center gap-1 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition duration-200 focus:outline-none hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-50'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'Next'}
                        <ChevronRight className="h-4 w-4" />
                    </button>
                    {/* <button
              className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'End'}
            </button> */}
                </div>
            </div>
        </div>
    );
}
