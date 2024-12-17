import React, { useEffect } from "react";
import { useParams } from "react-router";
import { kosStatusToBadgeColor, useAction } from "../../lib/helper";
import axios from "axios";
import { BASE_API_URL } from "../../lib/config";
import ImageCarousel from "../../components/Carousel";

const AdminKosDetailPage = () => {
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

  console.log(kosDetail);

  if (!getKosDetail.isSuccess) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full">
      <nav className="flex text-sm mb-8 text-gray-500">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/admin/kos" className="text-blue-600 hover:underline">
              Data Kos
            </a>
            <span className="mx-2">/</span>
          </li>
          <li>Kos Detail</li>
        </ol>
      </nav>

      <div className="mb-4">
        <p className="text-xs mb-2 text-gray-500">Status Saat Ini</p>
        <span
          className={`px-3 py-1 inline-flex leading-5 font-semibold rounded-full ${kosStatusToBadgeColor(
            kosDetail.current_status.status.id
          )}`}
        >
          {kosDetail.current_status.status.nama}
        </span>
      </div>

      <div className="flex justify-between mb-6 ">
        <div className="flex flex-col w-1/2">
          <p className="text-xs mb-3 text-gray-500">
            Riwayat Perubahan Status Data Kos
          </p>
          <ul className="space-y-2">
            {kosDetail.history_status.map((h) => (
              <>
                <li className="px-4 py-4 border-gray-200 border rounded-lg bg-white hover:bg-gray-50">
                  <p className="text-gray-800 text-xs mb-2 font-bold">#323</p>
                  <p className="text-gray-800 text-sm mb-2">{h.catatan}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(h.created_at).toLocaleString()}
                  </p>
                </li>
              </>
            ))}
          </ul>
        </div>

        <div className="w-1/2 p-4 flex flex-col">
          <p className="text-xs mb-3 text-gray-500">Aksi Admin</p>
          <button className="bg-blue-500 text-white px-8 py-2 rounded-md mt-4 md:mt-0 hover:bg-blue-600 transition shadow-md shadow-blue-200 mb-4">
            Approve Data Kos
          </button>

          <button className="bg-red-500 text-white px-8 py-2 rounded-md mt-4 md:mt-0 hover:bg-red-600 transition shadow-md shadow-red-200">
            Reject Data Kos
          </button>
        </div>
      </div>

      <div className="mb-6">
        <ImageCarousel fotos={kosDetail.fotos} />
      </div>

      <div className="grid grid-cols-3">
        <div>
          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Nama Kos</p>
            <p className="text-normal mb-2 text-gray-900">{kosDetail.nama}</p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Tipe Kos</p>
            <p className="text-normal mb-2 text-gray-900">
              {kosDetail.tipe_kos.nama}
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Lokasi Kos</p>
            <p className="text-normal mb-2 text-gray-900">
              {kosDetail.lokasi_kos}
            </p>
          </div>

          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Minimal Sewa</p>
            <p className="text-normal mb-2 text-gray-900">
              {kosDetail.minimal_sewa}
            </p>
          </div>
        </div>

        {/* Kolom Tengah */}
        <div>
          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Harga</p>
            <p className="text-normal mb-2 text-gray-900">
              Rp. {kosDetail.harga_kos}
            </p>
          </div>

          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Ketersediaan Kamar</p>
            <p className="text-normal mb-2 text-gray-900">
              {kosDetail.kamar_tersedia}
            </p>
          </div>

          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Nama Pemilik</p>
            <p className="text-normal mb-2 text-gray-900">
              {kosDetail.pemilik.name}
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Kontak Pemilik</p>
            <p className="text-normal mb-2 text-gray-900">
              {kosDetail.pemilik.email}
            </p>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div>
          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Fasilitas Kos</p>
            <ul>
              {kosDetail.fasilitas_kos.map((fasilitas, index) => (
                <li key={fasilitas.id} className="text-gray-900">
                  {index + 1}
                  {` ${fasilitas.nama}`}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-xs mb-1 text-gray-500">Peraturan Kos</p>
            <ul>
              {kosDetail.peraturan_kos.map((peraturan, index) => (
                <li key={peraturan.id} className="text-gray-900">
                  {index + 1}.{` ${peraturan.nama}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative w-full h-64 bg-gray-300 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7902.714580762124!2d112.6033753658386!3d-7.961978843823585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78828a75addd11%3A0xba4ad47a7f3adbc7!2sCharis%20National%20Academy!5e0!3m2!1sen!2sid!4v1734119785376!5m2!1sen!2sid"
          className="border-0 w-full"
          height={400}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default AdminKosDetailPage;
