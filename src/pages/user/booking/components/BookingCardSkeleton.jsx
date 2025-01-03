import React from 'react';

const BookingCardSkeleton = () => {
    return (
        <div className="border rounded-lg p-4 shadow-md animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
        </div>
    );
};

export default BookingCardSkeleton;
