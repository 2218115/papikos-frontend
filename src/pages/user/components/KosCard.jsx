import { useNavigate } from "react-router";
import { BASE_URL } from "../../../lib/config";

const KosCard = ({ data }) => {
    const navigate = useNavigate();

    const imagePath = data.fotos.length > 0
        ? `${BASE_URL}/foto_kos/${data.fotos[0].path}`
        : "https://placehold.co/600x400";

    return (
        <div
            className="rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-blue-200/30 duration-200 border border-blue-50"
            onClick={() => navigate(`/kos/${data.id}`)}
        >
            <img
                src={imagePath}
                alt={data.nama}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-bold truncate">{data.nama}</h3>
                <p className="text-sm text-gray-500 truncate">{data.lokasi_kos}</p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-blue-500 font-semibold">
                        Rp {data.harga_kos.toLocaleString('id-ID')} / {data.minimal_sewa}
                    </span>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <span>{data.kamar_tersedia} Kamar</span>
                        <span>{data.tipe_kos.nama}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KosCard;
