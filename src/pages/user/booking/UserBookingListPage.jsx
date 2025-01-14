import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Pagination from '../../../components/Pagination';
import BookingCard from './components/BookingCard'; // Komponen untuk menampilkan informasi booking
import BookingCardSkeleton from './components/BookingCardSkeleton';
import { getSession, useAction } from '../../../lib/helper';
import axios from 'axios';
import { BASE_API_URL } from '../../../lib/config';

const UserBookingListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getBookings.execute(page);
    };

    const getBookings = useAction({
        fn: async (page) => {
            const result = await axios.get(`${BASE_API_URL}/booking?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
            return result;
        },
        onSuccess: (data) => {
            setTotalPage(data.data.data.last_page);
        },
        placeholder: {
            data: [],
        },
    });

    useEffect(() => {
        getBookings.execute(currentPage);
    }, []);

    return (
        <div>
            <Header />
            <main className="p-4 mx-12">
                <h1 className="text-2xl font-bold mb-6 mt-32">Daftar Booking Anda</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-12">
                    {getBookings.isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <BookingCardSkeleton key={index} />
                        ))
                        : getBookings.data.data.length > 0
                            ? getBookings.data.data.map((booking) => (
                                <BookingCard key={booking.id} data={booking} />
                            ))
                            : <p className="text-center text-gray-500 w-full col-span-full">Tidak ada booking ditemukan</p>}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            </main>
        </div>
    );
};

export default UserBookingListPage;
