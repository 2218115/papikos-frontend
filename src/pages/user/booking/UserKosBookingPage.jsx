import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../lib/config";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import Toast from "../../../components/Toast";
import IonIcon from "@reacticons/ionicons";
import { useParams } from "react-router";
import KosCard from "./KosCard";
import { dateToInputDate, getSession, useAction } from "../../../lib/helper";

const BookingKosPage = () => {
    const { id } = useParams();

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

    const postBookingKos = useAction({
        fn: async (data) => {
            const result = axios.post(BASE_API_URL + '/booking', data, {
                headers: {
                    Authorization: 'Bearer ' + getSession().token,
                }
            });
            return result;
        },
        onSuccess: () => {
            window.location.assign('/');
        },
        onError: () => {
            setErrorToast("Gagal melakukan booking kos.");
        }
    });

    useEffect(() => {
        getKosDetail.execute();
    }, [id]);

    const [errorToast, setErrorToast] = useState("");

    const [data, setData] = useState({
        tanggal_awal: new Date(),
        durasi: 0,
        catatan: "",
        tanggal_berakhir: new Date(),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        postBookingKos.execute(data);
    };

    const handleChangeDurasi = (e) => {
        const new_durasi = e.target.value;
        const tanggal_awal = structuredClone(data.tanggal_awal);

        tanggal_awal.setMonth(tanggal_awal.getMonth() + new_durasi)
        const tanggal_berakhir = tanggal_awal;

        setData({ ...data, durasi: new_durasi, tanggal_berakhir: tanggal_berakhir });
    }

    const handleChangeTanggalAwal = (e) => {
        setTanggalAwal(e.target.value);
        const new_tanggal_awal = structuredClone(new Date(e.target.value));
        const durasi = data.durasi;
        new_tanggal_awal.setMonth(new_tanggal_awal.getMonth() + durasi)
        const tanggal_berakhir = new_tanggal_awal;

        setData({ ...data, tanggal_berakhir: tanggal_berakhir, tanggal_awal: new_tanggal_awal });
    }

    const [valueTanggalAwal, setTanggalAwal] = useState("");

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
                    label="Tanggal Awal"
                    placeholder="Masukkan Tanggal Awal"
                    value={valueTanggalAwal}
                    onChange={handleChangeTanggalAwal}
                    type="date"
                    isError={postBookingKos.isFieldError("tanggal_awal")}
                    errorHint={postBookingKos.getError("tanggal_awal")}
                />

                <TextInput
                    label="Durasi Sewa"
                    placeholder="Masukkan Durasi Sewa"
                    value={data.durasi}
                    onChange={handleChangeDurasi}
                    isError={postBookingKos.isFieldError("durasi")}
                    errorHint={postBookingKos.getError("durasi")}
                />

                <TextInput
                    label="Tanggal Berakhir"
                    placeholder="Masukkan Tanggal Berakhir"
                    value={dateToInputDate(data.tanggal_berakhir)}
                    disabled
                // onChange={(e) => setData({ ...data, durasi_sewa: e.target.value })}
                />

                <TextInput
                    label="Catatan"
                    placeholder="Masukkan Catatan"
                    value={data.catatan}
                    onChange={(e) => setData({ ...data, catatan: e.target.value })}
                    isError={postBookingKos.isFieldError("catatan")}
                    errorHint={postBookingKos.getError("catatan")}
                />


                <Button type="submit" className="w-full">
                    Booking Sekarang
                </Button>
            </form>
        </div>
    );
};

export default BookingKosPage;
