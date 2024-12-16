import axios from "axios";
import { getSession, useAction } from "../../lib/helper";
import { BASE_API_URL } from "../../lib/config";
import { useEffect } from "react";

const AdminDashboard = () => {
    const getAnalitikData = useAction({
        fn: async () => {
            const result = await axios.get(BASE_API_URL + '/kos/analitik', {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                }
            });
            return result;
        },
        placeholder: {
            data: {
                count_all_kos: 0,
                count_approved_kos: 0,
                count_waiting_kos: 0,
                count_rejected_kos: 0,
            }
        },
    });

    useEffect(() => {
        getAnalitikData.execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className="grid grid-cols-4 gap-x-4">
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg duration-200">
            <p className="text-xs mb-2 text-gray-500">Total Data Kos</p>
            <p className="text-xl font-bold text-gray-900">{getAnalitikData.isLoading ? <div className="rounded-xl overflow-hidden bg-gray-200 animate-pulse border h-6"></div> : getAnalitikData.data.count_all_kos}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg duration-200">
            <p className="text-xs mb-2 text-gray-500">Total Data Kos (Terpublikasi)</p>
            <p className="text-xl font-bold text-gray-900">{getAnalitikData.isLoading ? <div className="rounded-xl overflow-hidden bg-gray-200 animate-pulse border h-6"></div> : getAnalitikData.data.count_approved_kos}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg duration-200">
            <p className="text-xs mb-2 text-gray-500">Total Data Kos (Diajukan)</p>
            <p className="text-xl font-bold text-gray-900">{getAnalitikData.isLoading ? <div className="rounded-xl overflow-hidden bg-gray-200 animate-pulse border h-6"></div> : getAnalitikData.data.count_waiting_kos}</p>
        </div>
    </div>
}

export default AdminDashboard;