import React, { useRef, useState } from "react";
import TextInput from "../../components/TextInput";
import DropDown from "../../components/DropDown";
import IonIcon from "@reacticons/ionicons";
import { dataUriToBlob, fileToDataUrl } from "../../lib/helper";

const AdminTambahKosPage = () => {
    const formData = useRef(new FormData()).current;

    const [data, setData] = useState({
        fotos: [],
        nama_kos: "",
        harga_kos_per_bulan: 0,
        lokasi_kos: "",
        narahubung_kos: "",
        tipe_kos: {},
        embed_gmaps_kos: "",
        peraturan_kos: [],
        fasilitas_kos: [],
    });

    const [peraturan_kos, set_peraturan_kos] = useState("");
    const [fasilitas_kos, set_fasilitas_kos] = useState("");

    const handleOnPhotoChange = async (e) => {
        const files = e.target.files;
        const result = await fileToDataUrl(files);
        setData({ ...data, fotos: [...data.fotos, result] });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fotos_blob = data.fotos.map(v => dataUriToBlob(v));
        formData.append("foto[]", fotos_blob);
        formData.append("nama_kos", data.nama_kos);
        formData.append("harga_kos_per_bulan", data.harga_kos_per_bulan);
        formData.append("lokasi_kos", data.lokasi_kos);
        formData.append("narahubung_kos", data.narahubung_kos);
        formData.append("tipe_kos", data.tipe_kos);
        formData.append("embed_gmaps_kos", data.embed_gmaps_kos);
        formData.append("peraturan_kos[]", data.peraturan_kos);
        formData.append("fasilitas_kos[]", data.fasilitas_kos);
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Breadcrumb */}
            <nav className="flex text-sm mb-4 text-gray-500">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <a href="/admin/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="flex items-center">
                        <a href="/admin/data-kos" className="text-blue-600 hover:underline">Data Kos</a>
                        <span className="mx-2">/</span>
                    </li>
                    <li>Tambah Kos</li>
                </ol>
            </nav>

            {/* Title */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Tambah Data Kos</h1>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-6">
                    {
                        data.fotos.length > 0 ? data.fotos.map((foto, index) => (
                            <div className="w-full h-64 relative bg-gray-300 rounded-lg overflow-hidden mb-3 border border-zinc-300" key={foto}>
                                <img
                                    src={foto}
                                    alt="Kos Image"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute right-0 top-0 p-4 flex items-center justify-center bg-red-100 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer rounded-bl-lg" onClick={() => {
                                    setData({ ...data, fotos: [...data.fotos.splice(index + 1)] });
                                }}>
                                    <IonIcon name="trash" />
                                </div>
                            </div>
                        )) : (
                            <div className="w-full h-64 border border-zinc-200 rounded-lg overflow-hidden flex justify-center items-center">
                                <label htmlFor="fotos" className="border border-blue-500 w-fit rounded-full p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white text-blue-500 cursor-pointer">
                                    <IonIcon name="add" className="m-0 font-bold text-lg" size="32" />
                                </label>
                                <input type="file" hidden id="fotos" onChange={handleOnPhotoChange} />
                            </div>
                        )
                    }

                    {
                        data.fotos.length > 0 && (

                            <div className="w-full h-32 border border-zinc-200 rounded-lg overflow-hidden flex justify-center items-center">
                                <label htmlFor="fotos_more" className="border border-blue-500 w-fit rounded-full p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white text-blue-500 cursor-pointer">
                                    <IonIcon name="add" className="m-0 font-bold text-lg" size="32" />
                                </label>
                                <input type="file" hidden id="fotos_more" onChange={handleOnPhotoChange} />
                            </div>
                        )
                    }
                </div>

                <div className="grid grid-cols-2 w-full gap-x-4 mb-8">
                    <div>
                        <TextInput label={"Nama Kos"} placehoder={"Masukkan Nama Kos"} onChange={e => setData({ ...data, nama_kos: e.target.value })} value={data.nama_kos} />
                        <TextInput label={"Harga Kos per Bulan"} placehoder={"Masukkan Harga Kos per Bulan"} onChange={e => setData({ ...data, harga_kos_per_bulan: e.target.value })} value={data.harga_kos_per_bulan} />
                        <TextInput label={"Lokasi Kos"} placehoder={"Masukkan Deskripsi Lokasi Kos"} onChange={e => setData({ ...data, lokasi_kos: e.target.value })} value={data.lokasi_kos} />
                        <TextInput label={"Narahubung Kos"} placehoder={"Masukkan Narahubung Kos"} onChange={e => setData({ ...data, narahubung_kos: e.target.value })} value={data.narahubung_kos} />
                        <DropDown label="Tipe Kos" options={['Putra', 'Putri', 'Campur']} placeholder="Pilih Tipe Kos" onChange={e => setData({ ...data, tipe_kos: e.target.value })} value={data.tipe_kos} />
                        <TextInput label={"Embed Google Maps Kos"} placehoder={"Masukkan Embed Google Maps Kos"} onChange={e => setData({ ...data, embed_gmaps_kos: e.target.value })} value={data.embed_gmaps_kos} />
                    </div>

                    <div>
                        <div className="flex flex-col mb-4">
                            <label className="text-xs mb-2 text-gray-500">{"Peraturan Kos"}</label>
                            <div className="flex gap-4 justify-stretch">
                                <input
                                    value={peraturan_kos}
                                    onChange={(e) => set_peraturan_kos(e.target.value)}
                                    type="text"
                                    placeholder={"Masukkan nama peraturan"}
                                    className={`rounded-lg px-3 py-3 w-full  outline-none bg-white transition text-xs focus:ring-blue-500 focus:ring-1 border-gray-200 border`}
                                />

                                <div className="px-4  bg-blue-500 rounded-md flex items-center justify-center  cursor-pointer" onClick={() => {
                                    setData({ ...data, peraturan_kos: [...data.peraturan_kos, peraturan_kos] });
                                    set_peraturan_kos("");
                                }}>
                                    <IonIcon name="add-circle" className="text-white" />
                                </div>
                            </div>

                            <ul className="mt-4">
                                {
                                    data.peraturan_kos.map((p, index) => (
                                        <li className="text-sm px-2 py-1 border-zinc-500 border-l mb-2 flex space-x-2 items-center" key={p}>
                                            <p>{index + 1}. {p}</p>
                                            <IonIcon name="trash" className="text-red-300 hover:text-red-500 cursor-pointer" onClick={() => {
                                                setData({ ...data, peraturan_kos: [...data.peraturan_kos.splice(index + 1)] });
                                            }} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs mb-2 text-gray-500">{"Fasilitas Kos"}</label>
                            <div className="flex gap-4 justify-stretch">
                                <input
                                    value={fasilitas_kos}
                                    onChange={(e) => set_fasilitas_kos(e.target.value)}
                                    type="text"
                                    placeholder={"Masukkan nama peraturan"}
                                    className={`rounded-lg px-3 py-3 w-full  outline-none bg-white transition text-xs focus:ring-blue-500 focus:ring-1 border-gray-200 border`}
                                />

                                <div className="px-4  bg-blue-500 rounded-md flex items-center justify-center  cursor-pointer" onClick={() => {
                                    setData({ ...data, fasilitas_kos: [...data.fasilitas_kos, fasilitas_kos] });
                                    set_fasilitas_kos("");
                                }}>
                                    <IonIcon name="add-circle" className="text-white" />
                                </div>
                            </div>


                            <ul className="mt-4">
                                {
                                    data.fasilitas_kos.map((p, index) => (
                                        <li className="text-sm px-2 py-1 border-zinc-500 border-l mb-2 flex space-x-2 items-center" key={p}>
                                            <p>{index + 1}. {p}</p>
                                            <IonIcon name="trash" className="text-red-300 hover:text-red-500 cursor-pointer" onClick={() => {
                                                setData({ ...data, fasilitas_kos: [...data.fasilitas_kos.splice(index + 1)] });
                                            }} />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="flex space-x-2 justify-end">
                    <a href="/admin/kos" className="bg-zinc-500 text-white px-8 py-2 text-sm rounded-md mt-4 md:mt-0 hover:bg-zinc-600 transition shadow-md shadow-blue-200 mb-4 cursor-pointer">
                        Batal
                    </a>

                    <button type="submit" className="bg-blue-500 text-white px-8 py-2 text-sm rounded-md mt-4 md:mt-0 hover:bg-blue-600 transition shadow-md shadow-blue-200 mb-4 cursor-pointer" >
                        Simpan
                    </button>

                </div>
            </form >
        </div >
    );
}

export default AdminTambahKosPage;