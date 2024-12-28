import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { getSession, kosStatusToBadgeColor, useAction } from "../../lib/helper";
import axios from "axios";
import { BASE_API_URL } from "../../lib/config";
import ImageCarousel from "../../components/Carousel";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Editor from "../../components/Editor";

const AdminKosDetailPage = () => {
  const { id } = useParams(); // Retrieve `id_kos` from URL params

  const postSuspendKos = useAction({
    fn: async ({ catatan }) => {
      const response = await axios.post(`${BASE_API_URL}/kos/${id}/suspend`, {
        catatan: catatan,
      }, {
        headers: {
          Authorization: `Bearer ${getSession().token}`,
        },
      });
      return response;
    },
    onSuccess: () => {
      window.location.replace(`/admin/kos/${id}`);
    },
    onError: () => {

    }
  });

  const postRejectKos = useAction({
    fn: async ({ catatan }) => {
      const response = await axios.post(`${BASE_API_URL}/kos/${id}/reject`, {
        catatan: catatan,
      }, {
        headers: {
          Authorization: `Bearer ${getSession().token}`,
        },
      });
      return response;
    },
    onSuccess: () => {
      window.location.replace(`/admin/kos/${id}`);
    },
    onError: () => {

    }
  });

  const postApproveDataKos = useAction({
    fn: async () => {
      const response = await axios.post(`${BASE_API_URL}/kos/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${getSession().token}`,
        },
      });
      console.info(response.data);
      return response;
    },
    onSuccess: () => {
      window.location.replace(`/admin/kos/${id}`);
    },
    onError: () => {

    }
  });

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

  const catatanQuillRef = useRef();

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
                  <div className="text-gray-800 text-sm mb-2" dangerouslySetInnerHTML={{ __html: h.catatan }}></div>
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
          <Modal
            id={"approve_modal"}
            className="w-full"
            trigger={
              <Button disabled={kosDetail.current_status.status.id == 2} variant="primary" className="mb-4 w-full">Approve Data Kos</Button>
            }>
            <p className="font-bold mt-4 mb-2">Appove data Kos</p>
            <p className="text-zinc-500 text-sm mb-4">aksi ini akan membuat data kos tersedia secara publik</p>
            <div className="flex gap-2">
              <Button variant="primary" isLoading={postApproveDataKos.isLoading} className="mb-4 w-full" onClick={async () => {
                postApproveDataKos.execute();
              }}>Approve</Button>
            </div>
          </Modal>


          <Modal
            id={"reject_modal"}
            className="w-full"
            trigger={
              <Button disabled={kosDetail.current_status.status.id == 3 || kosDetail.current_status.status.id == 2} variant="danger" className="mb-4 w-full">Reject Data Kos</Button>
            }>
            <p className="font-bold mt-4 mb-2">Reject data Kos</p>
            <p className="text-zinc-500 text-sm mb-4">aksi ini akan membuat data kos tidak tersedia secara publik, sekaligus memberikan informasi pada pengguna tentang alasan kenapa data kos di lakukan reject.</p>
            <Editor label="Catatan" ref={catatanQuillRef} isError={postRejectKos.isFieldError("catatan")} errorHint={postRejectKos.getError("catatan")} />
            <div className="flex gap-2">
              <Button variant="danger" isLoading={postRejectKos.isLoading} className="mb-4 w-full" onClick={async () => {

                postRejectKos.execute({
                  catatan: catatanQuillRef.current.getSemanticHTML(),
                });
              }}>Reject</Button>
            </div>
          </Modal>

          <Modal
            id={"reject_modal"}
            className="w-full"
            trigger={
              <Button disabled={kosDetail.current_status.status.id == 4} variant="secondary" className="mb-4 w-full">Tangguhkan Data Kos</Button>
            }>
            <p className="font-bold mt-4 mb-2">Tangguhkan data Kos</p>
            <p className="text-zinc-500 text-sm mb-4">aksi ini akan membuat data kos tidak tersedia secara publik, sekaligus memberikan informasi pada pengguna tentang alasan kenapa data kos di lakukan suspend.</p>
            <Editor label="Catatan" ref={catatanQuillRef} isError={postSuspendKos.isFieldError("catatan")} errorHint={postSuspendKos.getError("catatan")} />
            <div className="flex gap-2">
              <Button variant="secondary" isLoading={postSuspendKos.isLoading} className="mb-4 w-full" onClick={async () => {
                postSuspendKos.execute({
                  catatan: catatanQuillRef.current.getSemanticHTML(),
                });
              }}>Tangguhkan</Button>
            </div>
          </Modal>
        </div>
      </div >

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

      <div className="bg-white rounded-lg mb-4">
        <h3 className="text-lg font-bold mb-4">Lokasi</h3>
        <div
          className="w-full h-72bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: kosDetail?.embed_gmaps.replace(/width="\d+"/, 'width="1920"').replace(/height="\d+"/, 'height="400"') || "" }}
        />
      </div>
    </div >
  );
};

export default AdminKosDetailPage;
