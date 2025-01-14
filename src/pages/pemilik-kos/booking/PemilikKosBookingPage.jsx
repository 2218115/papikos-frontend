import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/Table";
import DropDown from "../../../components/DropDown";
import { bookingStatusToBageColor, debounce, getSession, kosStatusToBadgeColor, useAction } from "../../../lib/helper";
import { BASE_API_URL } from "../../../lib/config";
import Pagination from "../../user/components/Pagination";
import Button from "../../../components/Button";

const PemilikKosBookingPage = () => {
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const getBookings = useAction({
        fn: async (query) => {
            const user = await axios.get(`${BASE_API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
            const result = await axios.get(`${BASE_API_URL}/booking/pemilik?page=${query.page}&search=${query.search}&status_id=${query.status}&pemilik=${user.data.data.user.id}`, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
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

    const postRejectBooking = useAction({
        fn: async (id) => {
            const response = await axios.post(`${BASE_API_URL}/booking/reject/${id}`, {
            }, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
            return response;
        },
        onSuccess: () => {
            window.location.reload();
        },
        onError: () => {

        }
    });

    const postApproveBooking = useAction({
        fn: async (id) => {
            const response = await axios.post(`${BASE_API_URL}/booking/approve/${id}`, {
            }, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
            return response;
        },
        onSuccess: () => {
            window.location.reload();
        },
        onError: () => {

        }
    });

    const postDoneBooking = useAction({
        fn: async (id) => {
            const response = await axios.post(`${BASE_API_URL}/booking/done/${id}`, {
            }, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
            return response;
        },
        onSuccess: () => {
            window.location.reload();
        },
        onError: () => {

        }
    });

    useEffect(() => {
        getBookings.execute({
            page: currentPage,
            search: search,
            status: status,
        });
    }, [currentPage, search, status]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = debounce((value) => {
        setSearch(value);
    }, 500);

    const handleChangeStatus = (key) => {
        setStatus(key);
    };

    return (
        <div>
            <div className="flex justify-between space-x-2">
                <div className="flex space-x-2 w-1/2">
                    <div className="">
                        <input
                            onChange={(e) => handleSearch(e.target.value)}
                            type="text"
                            placeholder="Cari pemesan, nama kos"
                            className="rounded-lg px-5 py-3 w-full md:w-96 outline-none bg-gray-200 transition text-xs focus:ring-blue-500 focus:ring-1"
                        />
                    </div>
                    <DropDown options={[{ key: "", label: "Semua" }, ...statusFilter]} placeholder="Pilih Status" onChange={handleChangeStatus} />
                </div>
                {/* 
                <a
                    href="/pemilik-kos/kos/tambah"
                    className="bg-blue-500 text-white px-8 py-2 text-sm rounded-md mt-4 md:mt-0 hover:bg-blue-600 transition shadow-md shadow-blue-200 mb-4 cursor-pointer"
                >
                    Tambah Data Kos
                </a> */}
            </div>

            <Table className="bg-white rounded-lg shadow-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Pemesan</TableHead>
                        <TableHead>Nama Kos</TableHead>
                        <TableHead>Tanggal Mulai</TableHead>
                        <TableHead>Tanggal Berakhir</TableHead>
                        <TableHead>Nominal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Catatan</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {getBookings.isLoading ? (
                        <tr>
                            <td colSpan="8" className="text-center w-full">
                                <div className="animate-pulse flex p-2">
                                    <div className="h-12 bg-gray-300 rounded w-full"></div>
                                </div>
                            </td>
                        </tr>
                    ) : getBookings.data.data.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-gray-500">
                                Belum ada data booking kos di sini
                            </td>
                        </tr>
                    ) : (
                        getBookings.data.data.map((row, index) => (
                            <TableRow
                                key={row.id}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.pemesan.name}</TableCell>
                                <TableCell>{row.kos.nama}</TableCell>
                                <TableCell>{new Date(row.tanggal_mulai).toLocaleString()}</TableCell>
                                <TableCell>{new Date(row.tanggal_berakhir).toLocaleString()}</TableCell>
                                <TableCell>{row.nominal}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bookingStatusToBageColor(row.status.id)}`}
                                    >
                                        {row.status.status}
                                    </span>
                                </TableCell>
                                <TableCell>{row.catatan}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-2">
                                        {
                                            row.status.id === 1 && (
                                                <>
                                                    <Button variant="primary" onClick={() => {
                                                        postApproveBooking.execute(row.id);
                                                    }}>Setujui</Button>
                                                    <Button variant="danger" onClick={() => {
                                                        postRejectBooking.execute(row.id);
                                                    }}>Tolak</Button>
                                                </>
                                            )
                                        }
                                        {
                                            row.status.id === 3 &&
                                            <Button variant="primary" className="bg-green-500 hover:bg-green-600" onClick={() => {
                                                postDoneBooking.execute(row.id);
                                            }}>Selesai</Button>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {!getBookings.isLoading && getBookings.data.data.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default PemilikKosBookingPage;
