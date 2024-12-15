const KosCardSkeleton = () => {
    return (
        <div className="rounded-xl overflow-hidden bg-gray-200 animate-pulse border border-blue-50">
            <div className="w-full h-40 bg-gray-300"></div>
            <div className="p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    <div className="flex gap-2">
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KosCardSkeleton;
