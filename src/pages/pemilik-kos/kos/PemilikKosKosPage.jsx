import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/Table";
import DropDown from "../../../components/DropDown";
import { debounce, getSession, kosStatusToBadgeColor, stringLimit, useAction } from "../../../lib/helper";
import { BASE_API_URL } from "../../../lib/config";
import Pagination from "../../user/components/Pagination";

const AdminKosPage = () => {
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const getKos = useAction({
        fn: async (query) => {
            const user = await axios.get(`${BASE_API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
            const result = await axios.get(`${BASE_API_URL}/kos?page=${query.page}&search=${query.search}&status_id=${query.status}&pemilik=${user.data.data.user.id}`);
            return result;
        },
        placeholder: {
            data: [],
        },
        onSuccess: (data) => {
            setTotalPage(data.data.data.last_page);
            setStatusFilter(data.data.status_filter.map(v => ({ key: v.id, label: v.nama })));
        }
    });

    useEffect(() => {
        getKos.execute({
            page: currentPage,
            search: search,
            status: status,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, status]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = debounce((value) => {
        setSearch(value);
    }, 500);

    const handleChangeStatus = (key) => {
        setStatus(key);
    }

    return (
        <div>
            <div className="flex justify-between space-x-2">
                <div className="flex space-x-2 w-1/2">
                    <div className="">
                        <input
                            onChange={(e) => {
                                handleSearch(e.target.value);
                            }}
                            type="text"
                            placeholder="Cari tempat, nama kos"
                            className="rounded-lg px-5 py-3 w-full md:w-96 outline-none bg-gray-200 transition text-xs focus:ring-blue-500 focus:ring-1"
                        />
                    </div>
                    <DropDown options={[{ key: "", label: "Semua" }, ...statusFilter]} placeholder="Pilih Tipe Kos" onChange={handleChangeStatus} />
                </div>

                <a
                    href="/pemilik-kos/kos/tambah"
                    className="bg-blue-500 text-white px-8 py-2 text-sm rounded-md mt-4 md:mt-0 hover:bg-blue-600 transition shadow-md shadow-blue-200 mb-4 cursor-pointer"
                >
                    Tambah Data Kos
                </a>
            </div>

            <Table className="bg-white rounded-lg shadow-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Pemilik</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {getKos.isLoading ? (
                        <tr>
                            <td colSpan="7" className="text-center w-full">
                                <div className="animate-pulse flex p-2">
                                    <div className="h-12 bg-gray-300 rounded w-full"></div>
                                </div>
                                <div className="animate-pulse flex p-2">
                                    <div className="h-12 bg-gray-300 rounded w-full"></div>
                                </div>
                                <div className="animate-pulse flex p-2">
                                    <div className="h-12 bg-gray-300 rounded w-full"></div>
                                </div>
                                <div className="animate-pulse flex p-2">
                                    <div className="h-12 bg-gray-300 rounded w-full"></div>
                                </div>
                                <div className="animate-pulse flex p-2">
                                    <div className="h-12 bg-gray-300 rounded w-full"></div>
                                </div>
                            </td>
                        </tr>
                    ) : getKos.data.data.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-gray-500">
                                Belum ada data kos di sini
                            </td>
                        </tr>
                    ) : (
                        getKos.data.data.map((row, index) => (
                            <TableRow
                                key={row.id}
                                onClick={() => {
                                    window.location.assign(`/pemilik-kos/kos/${row.id}`);
                                }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.nama}</TableCell>
                                <TableCell>{row.pemilik.name}</TableCell>
                                <TableCell>{stringLimit(row.lokasi_kos, 50)}</TableCell>
                                <TableCell>{row.tipe_kos.nama}</TableCell>
                                <TableCell>{`${row.harga_kos}/${row.minimal_sewa}`}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${kosStatusToBadgeColor(
                                            row.current_status.status.id
                                        )}`}
                                    >
                                        {row.current_status.status.nama}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {!getKos.isLoading && getKos.data.data.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default AdminKosPage;
