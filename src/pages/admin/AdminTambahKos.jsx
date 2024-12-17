import React, { useEffect, useRef, useState } from "react";
import TextInput from "../../components/TextInput";
import DropDown from "../../components/DropDown";
import IonIcon from "@reacticons/ionicons";
import {
  dataUriToBlob,
  fileToDataUrl,
  getSession,
  useAction,
} from "../../lib/helper";
import axios from "axios";
import { BASE_API_URL } from "../../lib/config";
import SearchableDropdown from "../../components/SearchableDropdown";
import Toast from "../../components/Toast";
import Button from "../../components/Button";

const AdminTambahKosPage = () => {
  const [errorToast, setErrorToast] = useState("");

  const getFormInit = useAction({
    fn: async () => {
      const result = await axios.get(BASE_API_URL + "/kos/form/init", {
        headers: {
          Authorization: `Bearer ${getSession().token}`,
        },
      });

      return result;
    },
    placeholder: {
      tipe_kos: [],
      pemilik_kos: [],
    },
  });

  useEffect(() => {
    getFormInit.execute();
  }, []);

  const postKos = useAction({
    fn: async (data) => {
      const result = await axios.post(BASE_API_URL + "/kos", data, {
        headers: {
          Authorization: `Bearer ${getSession().token}`,
        },
      });
      return result;
    },
    onSuccess: (data) => {
      window.location.replace("/admin/kos");
    },
    onError: (data) => {
      console.info("ERROR", data);
      setErrorToast(data.data.message);
    },
  });

  const [data, setData] = useState({
    nama: "",
    harga_kos: "",
    minimal_sewa: "",
    kamar_tersedia: "",
    lokasi_kos: "",
    narahubung_kos: "",
    tipe_kos: null,
    embed_gmaps: "",
    pemilik: "",
    fotos: [],
    peraturan_kos: [],
    fasilitas_kos: [],
  });

  const [peraturan_kos, set_peraturan_kos] = useState("");
  const [fasilitas_kos, set_fasilitas_kos] = useState("");

  const handleOnPhotoChange = async (e) => {
    const files = e.target.files;
    const result = await fileToDataUrl(files);
    setData({ ...data, fotos: [...data.fotos, result] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", data.nama);
    formData.append("harga_kos", data.harga_kos);
    formData.append("minimal_sewa", data.minimal_sewa);
    formData.append("lokasi_kos", data.lokasi_kos);
    formData.append("kamar_tersedia", data.kamar_tersedia);
    formData.append("narahubung_kos", data.narahubung_kos);
    formData.append("tipe_kos", data.tipe_kos);
    formData.append("pemilik", data.pemilik);
    formData.append("embed_gmaps", data.embed_gmaps);

    const fotos_blob = data.fotos.map((v) => dataUriToBlob(v));
    fotos_blob.forEach((v) => formData.append("kos_fotos[]", v));

    data.peraturan_kos.forEach((v) => formData.append("kos_peraturan[]", v));
    data.fasilitas_kos.forEach((v) => formData.append("kos_fasilitas[]", v));

    postKos.execute(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {errorToast && (
        <Toast
          message={errorToast}
          type="error"
          duration={3000}
          onClose={() => setErrorToast(null)}
        />
      )}

      {/* Breadcrumb */}
      <nav className="flex text-sm mb-4 text-gray-500">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/admin/kos" className="text-blue-600 hover:underline">
              Kos
            </a>
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
          {data.fotos.length > 0 ? (
            data.fotos.map((foto, index) => (
              <div
                className="w-full h-64 relative bg-gray-300 rounded-lg overflow-hidden mb-3 border border-zinc-300"
                key={foto}
              >
                <img
                  src={foto}
                  alt="Kos Image"
                  className="w-full h-full object-cover"
                />

                <div
                  className="absolute right-0 top-0 p-4 flex items-center justify-center bg-red-100 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer rounded-bl-lg"
                  onClick={() => {
                    setData({
                      ...data,
                      fotos: [...data.fotos.splice(index + 1)],
                    });
                  }}
                >
                  <IonIcon name="trash" />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-64 border border-zinc-200 rounded-lg overflow-hidden flex justify-center items-center">
              <label
                htmlFor="fotos"
                className="border border-blue-500 w-fit rounded-full p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white text-blue-500 cursor-pointer"
              >
                <IonIcon
                  name="add"
                  className="m-0 font-bold text-lg"
                  size="32"
                />
              </label>
              <input
                type="file"
                hidden
                id="fotos"
                onChange={handleOnPhotoChange}
              />
            </div>
          )}

          {data.fotos.length > 0 && (
            <div className="w-full h-32 border border-zinc-200 rounded-lg overflow-hidden flex justify-center items-center">
              <label
                htmlFor="fotos_more"
                className="border border-blue-500 w-fit rounded-full p-4 flex items-center justify-center hover:bg-blue-500 hover:text-white text-blue-500 cursor-pointer"
              >
                <IonIcon
                  name="add"
                  className="m-0 font-bold text-lg"
                  size="32"
                />
              </label>
              <input
                type="file"
                hidden
                id="fotos_more"
                onChange={handleOnPhotoChange}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 w-full gap-x-4 mb-8">
          <div className="w-full">
            <SearchableDropdown
              isError={postKos.isFieldError("pemilik")}
              hintError={postKos.getError("pemilik")}
              label={"Pemilik Kos"}
              options={getFormInit.data.pemilik_kos.map((v) => ({
                key: v.id,
                label: v.name,
              }))}
              placeholder="Pilih Pemilik Kos"
              onChange={(e) => setData({ ...data, pemilik: e })}
            />

            <TextInput
              label={"Nama Kos"}
              placehoder={"Masukkan Nama Kos"}
              onChange={(e) => setData({ ...data, nama: e.target.value })}
              value={data.nama}
              isError={postKos.isFieldError("nama")}
              errorHint={postKos.getError("nama")}
            />

            <TextInput
              label={"Harga Kos per"}
              placehoder={"Masukkan Harga Kos"}
              onChange={(e) => setData({ ...data, harga_kos: e.target.value })}
              value={data.harga_kos}
              isError={postKos.isFieldError("harga_kos")}
              errorHint={postKos.getError("harga_kos")}
            />

            <TextInput
              label={"Minimal Sewa"}
              placehoder={"Masukkan Minimal Sewa"}
              onChange={(e) =>
                setData({ ...data, minimal_sewa: e.target.value })
              }
              value={data.minimal_sewa}
              isError={postKos.isFieldError("minimal_sewa")}
              errorHint={postKos.getError("minimal_sewa")}
            />

            <TextInput
              label={"Lokasi Kos"}
              placehoder={"Masukkan Deskripsi Lokasi Kos"}
              onChange={(e) => setData({ ...data, lokasi_kos: e.target.value })}
              value={data.lokasi_kos}
              isError={postKos.isFieldError("lokasi_kos")}
              errorHint={postKos.getError("lokasi_kos")}
            />

            <TextInput
              label={"Narahubung Kos"}
              placehoder={"Masukkan Narahubung Kos"}
              onChange={(e) =>
                setData({ ...data, narahubung_kos: e.target.value })
              }
              value={data.narahubung_kos}
              isError={postKos.isFieldError("narahubung_kos")}
              errorHint={postKos.getError("narahubung_kos")}
            />

            <DropDown
              label="Tipe Kos"
              options={getFormInit.data.tipe_kos.map((t) => ({
                key: t.id,
                label: t.nama,
              }))}
              placeholder="Pilih Tipe Kos"
              onChange={(e) => setData({ ...data, tipe_kos: e })}
              value={data.tipe_kos}
              isError={postKos.isFieldError("tipe_kos")}
              errorHint={postKos.getError("tipe_kos")}
            />

            <TextInput
              label={"Embed Google Maps Kos"}
              placehoder={"Masukkan Embed Google Maps Kos"}
              onChange={(e) =>
                setData({ ...data, embed_gmaps: e.target.value })
              }
              value={data.embed_gmaps_kos}
              isError={postKos.isFieldError("embed_gmaps")}
              errorHint={postKos.getError("embed_gmaps")}
            />
          </div>

          <div>
            <TextInput
              label={"Ketersediaan Kamar"}
              placehoder={"Masukkan Ketersediaan Kamar"}
              onChange={(e) =>
                setData({ ...data, kamar_tersedia: e.target.value })
              }
              value={data.kamar_tersedia}
              isError={postKos.isFieldError("kamar_tersedia")}
              errorHint={postKos.getError("kamar_tersedia")}
            />

            <div className="flex flex-col mb-4">
              <label className="text-xs mb-2 text-gray-500">
                {"Peraturan Kos"}
              </label>
              <div className="flex gap-4 justify-stretch">
                <input
                  value={peraturan_kos}
                  onChange={(e) => set_peraturan_kos(e.target.value)}
                  type="text"
                  placeholder={"Masukkan nama peraturan"}
                  className={`rounded-lg px-3 py-3 w-full  outline-none bg-white transition text-xs focus:ring-blue-500 focus:ring-1 border-gray-200 border`}
                />

                <div
                  className="px-4  bg-blue-500 rounded-md flex items-center justify-center  cursor-pointer"
                  onClick={() => {
                    setData({
                      ...data,
                      peraturan_kos: [...data.peraturan_kos, peraturan_kos],
                    });
                    set_peraturan_kos("");
                  }}
                >
                  <IonIcon name="add-circle" className="text-white" />
                </div>
              </div>

              <ul className="mt-4">
                {data.peraturan_kos.map((p, index) => (
                  <li
                    className="text-sm px-2 py-1 border-zinc-500 border-l mb-2 flex space-x-2 items-center"
                    key={p}
                  >
                    <p>
                      {index + 1}. {p}
                    </p>
                    <IonIcon
                      name="trash"
                      className="text-red-300 hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        setData({
                          ...data,
                          peraturan_kos: [
                            ...data.peraturan_kos.splice(index + 1),
                          ],
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <label className="text-xs mb-2 text-gray-500">
                {"Fasilitas Kos"}
              </label>
              <div className="flex gap-4 justify-stretch">
                <input
                  value={fasilitas_kos}
                  onChange={(e) => set_fasilitas_kos(e.target.value)}
                  type="text"
                  placeholder={"Masukkan nama peraturan"}
                  className={`rounded-lg px-3 py-3 w-full  outline-none bg-white transition text-xs focus:ring-blue-500 focus:ring-1 border-gray-200 border`}
                />

                <div
                  className="px-4  bg-blue-500 rounded-md flex items-center justify-center  cursor-pointer"
                  onClick={() => {
                    setData({
                      ...data,
                      fasilitas_kos: [...data.fasilitas_kos, fasilitas_kos],
                    });
                    set_fasilitas_kos("");
                  }}
                >
                  <IonIcon name="add-circle" className="text-white" />
                </div>
              </div>

              <ul className="mt-4">
                {data.fasilitas_kos.map((p, index) => (
                  <li
                    className="text-sm px-2 py-1 border-zinc-500 border-l mb-2 flex space-x-2 items-center"
                    key={p}
                  >
                    <p>
                      {index + 1}. {p}
                    </p>
                    <IonIcon
                      name="trash"
                      className="text-red-300 hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        setData({
                          ...data,
                          fasilitas_kos: [
                            ...data.fasilitas_kos.splice(index + 1),
                          ],
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 justify-end">
          <a
            href="/admin/kos"
            className="py-2 px-4 rounded-lg transition duration-200 focus:outline-none bg-zinc-500 text-white shadow-lg shadow-zinc-100"
          >
            Batal
          </a>

          <Button
            type="submit"
            isLoading={postKos.isLoading}
            className="shadow-lg shadow-blue-100"
          >
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminTambahKosPage;
