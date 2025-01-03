import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../lib/config";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import DropDown from "../../../components/DropDown";
import Toast from "../../../components/Toast";
import IonIcon from "@reacticons/ionicons";
import { useParams } from "react-router";
import KosCard from "./KosCard";
import { useAction } from "../../../lib/helper";

const BookingKosPage = () => {
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

    const [errorToast, setErrorToast] = useState("");
    const [data, setData] = useState({
        nama: "",
        tipe_kos: null,
        tanggal_masuk: "",
        durasi_sewa: "",
        kontak_pemesan: "",
    });

    const [tipeKosOptions, setTipeKosOptions] = useState([]);

    useEffect(() => {
        const fetchTipeKos = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/kos/tipe`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTipeKosOptions(response.data);
            } catch (error) {
                console.error("Error fetching tipe kos", error);
                setErrorToast("Gagal memuat tipe kos.");
            }
        };

        fetchTipeKos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${BASE_API_URL}/kos/booking`,
                {
                    ...data,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Booking berhasil!");
        } catch (error) {
            console.error("Error during booking", error);
            setErrorToast("Gagal melakukan booking kos.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex gap-4 items-center mb-5">
                <a href={`/kos/${id}`} className="p-4 hover:bg-blue-500 flex justify-center items-center hover:text-white text-black duration-300 rounded-xl cursor-pointer">
                    <IonIcon name="arrow-back" className="font-medium" />
                </a>
                <h1 className="text-2xl font-bold">Booking Kos</h1>
            </div>

            {errorToast && (
                <Toast
                    message={errorToast}
                    type="error"
                    duration={3000}
                    onClose={() => setErrorToast("")}
                />
            )}

            <KosCard kos={getKosDetail.data} className="mb-8" />

            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Nama Pemesan"
                    placeholder="Masukkan nama Anda"
                    value={data.nama}
                    onChange={(e) => setData({ ...data, nama: e.target.value })}
                />

                {/* <DropDown
                    label="Tipe Kos"
                    options={tipeKosOptions.map((tipe) => ({ key: tipe.id, label: tipe.nama }))}
                    placeholder="Pilih tipe kos"
                    value={data.tipe_kos}
                    onChange={(value) => setData({ ...data, tipe_kos: value })}
                /> */}

                <TextInput
                    label="Tanggal Masuk"
                    placeholder="YYYY-MM-DD"
                    value={data.tanggal_masuk}
                    onChange={(e) => setData({ ...data, tanggal_masuk: e.target.value })}
                />

                <TextInput
                    label="Durasi Sewa (bulan)"
                    placeholder="Masukkan durasi sewa"
                    value={data.durasi_sewa}
                    onChange={(e) => setData({ ...data, durasi_sewa: e.target.value })}
                />

                <TextInput
                    label="Kontak Pemesan"
                    placeholder="Masukkan nomor telepon"
                    value={data.kontak_pemesan}
                    onChange={(e) => setData({ ...data, kontak_pemesan: e.target.value })}
                />

                <Button type="submit" className="w-full">
                    Booking Sekarang
                </Button>
            </form>
        </div>
    );
};

export default BookingKosPage;
