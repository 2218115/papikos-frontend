import React from 'react';

const BookingCard = ({ data }) => {
    const handleAddReview = () => {
        // Navigasi ke halaman ulasan atau buka modal ulasan
        console.log('Navigasi ke halaman ulasan untuk booking:', data.id);
    };

    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold">{data.kos.nama}</h2>
            <p className="text-gray-500">{data.kos.alamat}</p>
            <p className="mt-2">Status: <span className="font-semibold">{data.status}</span></p>
            {data.status === 'selesai' && (
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleAddReview}
                >
                    Tambah Ulasan
                </button>
            )}
        </div>
    );
};

export default BookingCard;
