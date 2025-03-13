import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';

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
        return <div className="p-8">No data Found</div>;
    }

    return (
        <div className="p-4">
            <div className="relative sm:rounded-lg overflow-x-auto">
                <table id="react-table" className="w-full min-w-max table-auto text-left shadow-lg rounded-lg divide-y divide-gray-200">
                    <thead className="text-lg uppercase">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="text-center px-1 py-2  text-base font-medium text-gray-500 uppercase tracking-wider"
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
                    <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="text-center  *:even:bg-blue-gray-50/50 text-sm">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="text-sm px-1 py-4 whitespace-nowrap pl-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="h-2 pt-6" />
            <div className="flex gap-2 justify-between pt-3 border-t border-gray-200">
                <div className="flex pt-2 gap-4">
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
                        className="bg-white border border-input h-10 px-1 py-2 justify-center whitespace-nowrap rounded-md text-md font-medium shadow-sm"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>

                    <p className='flex items-center justify-center'>Entries Per Page</p>
                </div>

                <div className="pt-3 flex gap-3">
                    {/* <button
              className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'Start'}
            </button> */}
                    <button
                        className="border border-input h-10 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'Previous'}
                    </button>

                    <button
                        className="border border-gray-400 rounded-md h-10 px-4 py-2 justify-center whitespace-nowrap text-sm font-medium shadow-sm hover:bg-gray-100 transition-all ease-linear duration-200"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'Next'}
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
