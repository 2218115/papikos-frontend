
import React from "react";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import ImageCarousel from "../../../components/Carousel";

const KosCard = ({ kos, className }) => {
    return (
        <div className={`w-full bg-white rounded-lg shadow-xl overflow-hidden ${className}`}>
            <div className="w-full bg-gray-200">
                <ImageCarousel fotos={kos.fotos} />
            </div>

            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{kos.nama}</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Tipe: {kos.tipe_kos?.nama || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Alamat:</strong> {kos.lokasi_kos || "-"}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    <strong>Harga:</strong> Rp {kos.harga_kos?.toLocaleString() || "0"} / bulan
                </p>

                <Button
                    variant="outlinedPrimary"
                    className="w-full"
                    onClick={() => window.location.href = `/kos/${kos.id}`}
                >
                    Lihat Detail
                </Button>
            </div>
        </div>
    );
};

KosCard.propTypes = {
    kos: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nama: PropTypes.string.isRequired,
        tipe_kos: PropTypes.shape({
            nama: PropTypes.string,
        }),
        lokasi_kos: PropTypes.string,
        harga_kos: PropTypes.number,
        fotos: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
            })
        ),
    }).isRequired,
};

export default KosCard;
