import React from "react";

const AdminKosDetailPage = () => {


    return (
        <div className="bg-white rounded-xl shadow-sm p-6 w-full">
            <nav className="flex text-sm mb-8 text-gray-500">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <a href="/admin/kos" className="text-blue-600 hover:underline">Data Kos</a>
                        <span className="mx-2">/</span>
                    </li>
                    <li>Kos Detail</li>
                </ol>
            </nav>

            <div className="mb-4">
                <p className="text-xs mb-2 text-gray-500">Status Saat Ini</p>
                <span
                    className={`px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                >
                    {'Diajukan'}
                </span>
            </div>

            <div className="flex justify-between mb-6 ">
                <div className="flex flex-col w-1/2">
                    <p className="text-xs mb-3 text-gray-500">Riwayat Perubahan Status Data Kos</p>
                    <ul className="space-y-2">
                        <li className="px-4 py-4 border-gray-200 border rounded-lg bg-white hover:bg-gray-50">
                            <p className="text-gray-800 text-xs mb-2 font-bold">#323</p>
                            <p className="text-gray-800 text-sm mb-2">Pemilik Kos Mengajukan data kos</p>
                            <p className="text-gray-500 text-xs">{new Date().toLocaleString()}</p>
                        </li>
                        <li className="px-4 py-4 border-gray-200 border rounded-lg bg-white hover:bg-gray-50">
                            <p className="text-gray-800 text-xs mb-2 font-bold">#323</p>
                            <p className="text-gray-800 text-sm mb-2">Pemilik Kos Mengajukan data kos</p>
                            <p className="text-gray-500 text-xs">{new Date().toLocaleString()}</p>
                        </li>
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
                <div className="relative w-full h-64 bg-gray-300 rounded-lg overflow-hidden">
                    <img
                        src="https://via.placeholder.com/800x400"
                        alt="Kos Image"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 px-4 py-2 bg-blue-500 text-white text-sm rounded-br-lg">
                        Promo Diskon
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3">
                <div>
                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Nama Kos</p>
                        <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                    </div>
                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Tipe Kos</p>
                        <p className="text-normal mb-2 text-gray-900">Kos Campur</p>
                    </div>
                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Lokasi Kos</p>
                        <p className="text-normal mb-2 text-gray-900">Malang</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Harga</p>
                        <p className="text-normal mb-2 text-gray-900">Rp. 50.000/Bulan</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Narahubung Kos</p>
                        <p className="text-normal mb-2 text-gray-900">+62382732327</p>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Nama Pemilik</p>
                        <p className="text-normal mb-2 text-gray-900">Bu Indah</p>
                    </div>
                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Kontak Pemilik</p>
                        <p className="text-normal mb-2 text-gray-900">+6238298329</p>
                    </div>
                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Email</p>
                        <p className="text-normal mb-2 text-gray-900">indah@gmail.com</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Alamat Pemilik</p>
                        <p className="text-normal mb-2 text-gray-900">Jl Malang Raya</p>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Fasilitas Kos</p>
                        <ul>
                            <li>
                                <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                            </li>
                            <li>
                                <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                            </li>
                            <li>
                                <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                            </li>
                            <li>
                                <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col mb-4">
                        <p className="text-xs mb-1 text-gray-500">Peraturan Kos</p>
                        <ul>
                            <li>
                                <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                            </li>
                            <li>
                                <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                            </li>
                            <li>
                                <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                            </li>
                            <li>
                                <p className="text-normal mb-2 text-gray-900">Kos Indah Jaya</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relative w-full h-64 bg-gray-300 rounded-lg overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7902.714580762124!2d112.6033753658386!3d-7.961978843823585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78828a75addd11%3A0xba4ad47a7f3adbc7!2sCharis%20National%20Academy!5e0!3m2!1sen!2sid!4v1734119785376!5m2!1sen!2sid" className="border-0 w-full" height={400} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
};

export default AdminKosDetailPage;
