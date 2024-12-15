const AdminDashboard = () => {
    return <div className="grid grid-cols-4 gap-x-4">
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg duration-200">
            <p className="text-xs mb-2 text-gray-500">Total Data Kos</p>
            <p className="text-xl font-bold text-gray-900">50</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg duration-200">
            <p className="text-xs mb-2 text-gray-500">Total Data Kos (Terpublikasi)</p>
            <p className="text-xl font-bold text-gray-900">20</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg duration-200">
            <p className="text-xs mb-2 text-gray-500">Total Data Kos (Diajukan)</p>
            <p className="text-xl font-bold text-gray-900">20</p>
        </div>
    </div>
}

export default AdminDashboard;