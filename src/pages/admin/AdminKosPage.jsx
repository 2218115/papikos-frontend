import React from "react";
import Pagination from "../user/components/Pagination";

const Table = React.forwardRef(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
        <table
            ref={ref}
            className={`w-full caption-bottom text-sm ${className || ""}`}
            {...props}
        />
    </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
    <thead ref={ref} className={`[&_tr]:border-b ${className || ""}`} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={`[&_tr:last-child]:border-0 ${className || ""}`}
        {...props}
    />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={`border-t bg-muted/50 font-medium [&>tr]:last:border-b-0 ${className || ""}`}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={`border-b border-b-gray-100 transition hover:bg-blue-50 cursor-pointer duration-100 data-[state=selected]:bg-muted ${className || ""}`}
        {...props}
    />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className || ""}`}
        {...props}
    />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className || ""}`}
        {...props}
    />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={`mt-4 text-sm text-muted-foreground ${className || ""}`}
        {...props}
    />
));
TableCaption.displayName = "TableCaption";




const AdminKosPage = () => {
    const data = [
        { id: 1, name: "Kos Meruya", owner: "John Doe", price: "$300", status: "Available" },
        { id: 2, name: "Kos Kembangan", owner: "Jane Smith", price: "$250", status: "Occupied" },
        { id: 3, name: "Kos Palmerah", owner: "Alice Brown", price: "$200", status: "Available" },
    ];

    return (
        <div className="">
            <div className="flex justify-between">
                <div>
                    <input
                        type="text"
                        placeholder="Cari tempat, nama kos"
                        className="rounded-lg px-5 py-3 w-full md:w-96 outline-none bg-gray-200 transition text-xs focus:ring-blue-500 focus:ring-1"
                    />
                </div>

                <a href="/admin/kos/tambah" className="bg-blue-500 text-white px-8 py-2 text-sm rounded-md mt-4 md:mt-0 hover:bg-blue-600 transition shadow-md shadow-blue-200 mb-4 cursor-pointer">
                    Tambah Data Kos
                </a>
            </div>

            <Table className="bg-white rounded-lg shadow-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={row.id} onClick={() => {
                            window.location.assign(`/admin/kos/${row.id}`);
                        }}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.owner}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === "Available"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {row.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Pagination currentPage={1} totalPages={10} />
        </div>
    );
}

export default AdminKosPage;