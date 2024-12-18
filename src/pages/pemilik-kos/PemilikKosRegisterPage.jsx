import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router";
import { BASE_API_URL } from "../../lib/config";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import FileInput from "../../components/FileInput";
import { useAction } from "../../lib/helper";

const PemilikKosRegisterPage = () => {
    const [data, setData] = useState({
        nama: "",
        email: "",
        password: "",
        password_confirmation: "",
        alamat: "",
        foto_identitas: null,
    });

    const register = useAction({
        fn: async (params) => {
            const formData = new FormData();
            Object.keys(params).forEach((key) => {
                formData.append(key, params[key]);
            });
            const result = await axios.post(BASE_API_URL + "/auth/register-owner", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return result;
        },
        onSuccess: (data) => {
            localStorage.setItem("session", JSON.stringify(data.data));
            window.location.replace("/");
        },
        onError: (error) => { },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        register.execute(data);
    };

    return (
        <div>
            <main className="flex items-center justify-center h-screen">
                <form
                    className="flex flex-col p-8 border border-gray-200 rounded-xl w-full md:w-3/4 lg:w-1/2"
                    onSubmit={handleSubmit}
                >
                    <h1 className="font-bold text-lg mb-12 text-center">
                        Daftar Sebagai Pemilik Kos
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <FileInput
                                label="Foto Identitas"
                                onChange={(e) =>
                                    setData({ ...data, foto_identitas: e.target.files[0] })
                                }
                                isError={register.isFieldError("foto_identitas")}
                                errorHint={register.getError("foto_identitas")}
                                className="w-full"
                            />

                            <TextInput
                                label="Nama Lengkap"
                                value={data.nama}
                                onChange={(e) => setData({ ...data, nama: e.target.value })}
                                isError={register.isFieldError("nama")}
                                errorHint={register.getError("nama")}
                                placeholder="Masukkan Nama Lengkap"
                                className="w-full"
                            />

                            <TextInput
                                label="Email"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                isError={register.isFieldError("email")}
                                errorHint={register.getError("email")}
                                placeholder="Masukkan Email"
                                className="w-full"
                            />
                        </div>

                        <div>
                            <TextInput
                                label="Katasandi"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                isError={register.isFieldError("password")}
                                errorHint={register.getError("password")}
                                placeholder="Masukkan Katasandi"
                                type="password"
                                className="w-full"
                            />

                            <TextInput
                                label="Konfirmasi Katasandi"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData({ ...data, password_confirmation: e.target.value })
                                }
                                isError={register.isFieldError("password_confirmation")}
                                errorHint={register.getError("password_confirmation")}
                                placeholder="Konfirmasi Katasandi"
                                type="password"
                                className="w-full"
                            />

                            <TextInput
                                label="Alamat"
                                value={data.alamat}
                                onChange={(e) => setData({ ...data, alamat: e.target.value })}
                                isError={register.isFieldError("alamat")}
                                errorHint={register.getError("alamat")}
                                placeholder="Masukkan Alamat"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <Button
                        isLoading={register.isLoading}
                        className="w-full mt-4"
                        variant="primary"
                    >
                        Daftar
                    </Button>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-500">
                            Sudah punya akun?{" "}
                            <NavLink className="text-blue-500 font-bold" to="/login">
                                Masuk
                            </NavLink>
                        </p>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default PemilikKosRegisterPage;