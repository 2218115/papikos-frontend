import React from 'react';

const Spinner = ({ className }) => {
    return (
        <div className="flex justify-center items-center space-x-2">
            <div className={`w-6 h-6 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500 ${className}`}></div>
        </div>
    );
};

export default Spinner;