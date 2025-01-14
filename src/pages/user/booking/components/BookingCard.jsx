import React, { useRef, useState } from 'react';
import { BASE_API_URL, BASE_URL } from '../../../../lib/config';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import Editor from '../../../../components/Editor';
import DropDown from '../../../../components/DropDown';
import { getSession, useAction } from '../../../../lib/helper';
import axios from 'axios';
import Toast from '../../../../components/Toast';

const KosBookingCard = ({ data }) => {
    console.info('data', data);

    const [errorToast, setErrorToast] = useState("");
    const [ulasanData, setUlasanData] = useState({ ulasan: "", rating: "1", id_kos: data.kos.id });
    const ulasanQuillRef = useRef();

    const postUlasanKos = useAction({
        fn: async (data) => {
            console.info(data);
            const result = await axios.post(BASE_API_URL + "/ulasan", data, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
            return result;
        },
        onSuccess: (data) => {
            window.location.replace("/booking");
        },
        onError: (data) => {
            console.info("ERROR", data);
            setErrorToast(data.data.message);
        },
    });

    const postCancelBooking = useAction({
        fn: async (id) => {
            const result = await axios.post(BASE_API_URL + "/booking/cancel/" + id, {}, {
                headers: {
                    Authorization: `Bearer ${getSession().token}`,
                },
            });
            return result;
        },
        onSuccess: (data) => {
            window.location.reload();
        },
        onError: (data) => {
            console.info("ERROR", data);
            setErrorToast(data.data.message);
        },
    });

    return (
        <div className="rounded-xl p-4 bg-white shadow-lg border">
            {errorToast && (
                <Toast
                    message={errorToast}
                    type="error"
                    duration={3000}
                    onClose={() => setErrorToast(null)}
                />
            )}


            <h2 className="text-lg font-bold">{data.kos.nama}</h2>
            <div className="flex justify-center my-4">
                {data.kos.fotos && data.kos.fotos.length > 0 ? (
                    <img
                        src={`${BASE_URL}/foto_kos/${data.kos.fotos[0].path}`}
                        alt="Kos"
                        className="rounded-lg object-cover"
                    />
                ) : (
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Kos"
                        className="rounded-lg object-cover"
                    />
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">Lokasi</div>
                <div>{data.kos.lokasi_kos}</div>
                <div className="font-semibold">Status</div>
                <div className="text-blue-600">{data.status.status}</div>
                <div className="font-semibold">Penyewa</div>
                <div>{data.pemesan.name} ({data.pemesan.email})</div>
                <div className="font-semibold">Nominal</div>
                <div>Rp {data.nominal.toLocaleString()}</div>
                <div className="font-semibold">Durasi Sewa</div>
                <div>{data.waktu_sewa} bulan</div>
                <div className="font-semibold">Total Bayar</div>
                <div>Rp {data.total.toLocaleString()}</div>
                <div className="font-semibold">Tanggal Mulai</div>
                <div>{new Date(data.tanggal_mulai).toLocaleString()}</div>
                <div className="font-semibold">Tanggal Berakhir</div>
                <div>{new Date(data.tanggal_berakhir).toLocaleString()}</div>
                <div className="font-semibold">Catatan</div>
                <div className="italic">{data.catatan}</div>
            </div>

            <a href={`https://api.whatsapp.com/send?phone=${data.kos.narahubung_kos}`} target='_blank'>
                <Button disabled={false} variant="primary" className="w-full mt-4">Kontak Pemilik</Button>
            </a>

            <Modal
                id={"approve_modal"}
                className="w-full mt-4"
                trigger={
                    <Button disabled={data.status.id !== 4} variant="secondary" className="mb-4 w-full">Berikan Ulasan</Button>
                }>
                <p className="font-bold mt-4 mb-2">Berikan Ulasan</p>
                <p className="text-zinc-500 text-sm mb-4">aksi ini akan memberikan ulasan pada kos</p>
                <Editor label="Ulasan" ref={ulasanQuillRef} isError={postUlasanKos.isFieldError('ulasan')} errorHint={postUlasanKos.getError('ulasan')} />
                <DropDown isError={postUlasanKos.isFieldError('rating')} errorHint={postUlasanKos.getError('rating')} label={"Rating"} options={[{ key: "1", label: "⭐" }, { key: "2", label: "⭐⭐" }, { key: "3", label: "⭐⭐⭐" }, { key: "4", label: "⭐⭐⭐⭐" }, { key: "5", label: "⭐⭐⭐⭐⭐" },]} placeholder="Pilih Rating" onChange={(value) => {
                    setUlasanData({ ...ulasanData, rating: value });
                }} />

                <div className="flex gap-2">
                    <Button disabled={data.status.id !== 4} variant="primary" isLoading={postUlasanKos.isLoading} className="mb-4 w-full" onClick={async () => {
                        postUlasanKos.execute({ ...ulasanData, id_kos: data.kos.id, ulasan: ulasanQuillRef.current.getSemanticHTML() });
                    }}>Posting Ulasan</Button>
                </div>
            </Modal>
            <Button disabled={data.status.id !== 1} isLoading={postCancelBooking.isLoading} variant="outlinedDanger" className="mb-4 w-full" onClick={() => { postCancelBooking.execute(data.id); }}>Batalkan Booking</Button>
        </div>
    );
};

export default KosBookingCard;
