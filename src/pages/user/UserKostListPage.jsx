import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Pagination from './components/Pagination';
import KosCard from './components/KosCard';
import KosCardSkeleton from './components/KosCardSkeleton';
import { getSession, useAction } from '../../lib/helper';
import axios from 'axios';
import { BASE_API_URL } from '../../lib/config';

const UserKostListPage = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        getKos.execute(page);
    };

    const getKos = useAction({
        fn: async (page) => {
            const result = await axios.get(`${BASE_API_URL}/kos?page=${page}`);
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
        getKos.execute(currentPage);
    }, []);

    console.log(getKos.data);

    return (
        <div className="">
            <Header />
            <main className="p-4 mx-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-32">
                    {getKos.isLoading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <KosCardSkeleton key={index} />
                        ))
                        : getKos.data.data.length > 0
                            ? getKos.data.data.map((kos) => (
                                <KosCard key={kos.id} data={kos} />
                            ))
                            : <p className="text-center text-gray-500 w-full col-span-full">No items found</p>}
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

export default UserKostListPage;
