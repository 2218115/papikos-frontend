import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useAction } from "../../lib/helper"; // Assuming you have a custom `useAction` hook
import Header from "./components/Header";
import { BASE_API_URL, BASE_URL } from "../../lib/config";
import ImageCarousel from "../../components/Carousel";


const UserKosDetailPage = () => {
    const { id } = useParams(); // Retrieve `id_kos` from URL params

    const getKosDetail = useAction({
        fn: async () => {
            const response = await axios.get(`${BASE_API_URL}/kos/${id}`);
            return response;
        },
        placeholder: {
            message: "",
            data: null,
        },
    });

    useEffect(() => {
        getKosDetail.execute();
    }, [id]);

    const kosDetail = getKosDetail.data;

    if (!getKosDetail.isSuccess) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Content */}
            <main className="container mx-auto px-8 py-6 pt-36">
                {/* Breadcrumb */}
                <nav className="container text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
                    <ol className="flex space-x-1">
                        <li>
                            <a href="/" className="text-blue-500 hover:underline">Kos</a>
                        </li>
                        <li>
                            <span>/</span>
                        </li>
                        <li className="text-gray-500">{kosDetail?.nama || "Loading..."}</li>
                    </ol>
                </nav>

                <ImageCarousel fotos={kosDetail.fotos} />

                {/* Kos Information */}
                <div className="bg-white rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-2">{kosDetail?.nama || "Loading..."}</h2>
                    <p className="text-gray-700 mb-4">
                        Tipe {kosDetail?.tipe_kos?.nama || "N/A"}
                    </p>
                    <p className="text-gray-600">
                        <strong>Alamat:</strong> {kosDetail?.lokasi_kos || "Loading..."}
                    </p>
                    <p className="text-gray-600 mb-4">
                        <strong>Harga:</strong> Rp {kosDetail?.harga_kos.toLocaleString() || "0"} / bulan
                    </p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
                        Pesan Sekarang
                    </button>
                </div>

                {/* Fasilitas */}
                <div className="bg-white rounded-lg mb-4">
                    <h3 className="text-lg font-bold mb-4">Fasilitas</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {kosDetail?.fasilitas_kos?.map((fasilitas) => (
                            <li key={fasilitas.id}>{fasilitas.nama}</li>
                        )) || <li>Loading...</li>}
                    </ul>
                </div>

                {/* Lokasi */}
                <div className="bg-white rounded-lg mb-4">
                    <h3 className="text-lg font-bold mb-4">Lokasi</h3>
                    <div
                        className="w-full h-72bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: kosDetail?.embed_gmaps.replace(/width="\d+"/, 'width="1920"').replace(/height="\d+"/, 'height="400"') || "" }}
                    />
                </div>

                {/* Ulasan */}
                <div className="bg-white rounded-lg mb-4">
                    <h3 className="text-lg font-bold mb-4">Ulasan</h3>
                    <ul>
                        {kosDetail?.ulasan?.map((ulasan) => (
                            <li key={ulasan.id} className="mb-4">
                                <div className="flex gap-4 items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full" />
                                        <div>
                                            <h3 className="font-bold text-sm text-gray-600 mt-1">
                                                {ulasan.pemberi_ulasan.name}
                                            </h3>
                                            <p className="font-normal text-xs text-gray-400">
                                                {new Date(ulasan.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border border-gray-400 p-2 inline h-fit rounded-lg">
                                        <p className="font-bold text-sm">{ulasan.rating}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-gray-900">{ulasan.ulasan}</p>

                                {/* Balasan */}
                                {ulasan.balasan?.length > 0 && (
                                    <div className="border-l border-l-gray-300 pl-12 mt-4">
                                        <p className="text-sm text-gray-300">Balasan Pemilik</p>
                                        {ulasan.balasan.map((balasan) => (
                                            <div key={balasan.id} className="mt-4">
                                                <div className="flex gap-4">
                                                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                                                    <div>
                                                        <h3 className="font-bold text-sm text-gray-600 mt-1">
                                                            {balasan.pemberi_ulasan.name}
                                                        </h3>
                                                        <p className="font-normal text-xs text-gray-400">
                                                            {new Date(balasan.created_at).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="mt-4 text-sm text-gray-900">
                                                    {balasan.ulasan}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                        )) || <li>Loading...</li>}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default UserKosDetailPage;
