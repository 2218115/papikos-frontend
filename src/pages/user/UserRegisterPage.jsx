import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router";
import { BASE_API_URL } from "../../lib/config";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useAction } from "../../lib/helper";

const UserRegisterPage = () => {
  const [data, setData] = useState({
    nama: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const register = useAction({
    fn: async (params) => {
      const result = await axios.post(BASE_API_URL + "/auth/register", {
        ...params,
      });
      return result;
    },
    onSuccess: (data) => {
      localStorage.setItem("session", JSON.stringify(data.data));
      window.location.replace("/");
    },
    onError: (error) => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register.execute(data);
  };

  return (
    <div>
      <main className="flex items-center justify-center h-screen ">
        <form
          className="flex items-center flex-col p-8 border border-gray-200 rounded-xl w-full md:w-1/2 lg:w-1/4"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-lg mb-12">
            Daftar Sebagai Pengguna Baru
          </h1>

          <TextInput
            label="Nama"
            value={data.nama}
            onChange={(e) => setData({ ...data, nama: e.target.value })}
            isError={register.isFieldError("nama")}
            errorHint={register.getError("nama")}
            placeholder="Masukkan Nama Anda"
            className="w-full"
          />

          <TextInput
            label="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Masukkan Email Anda"
            isError={register.isFieldError("email")}
            errorHint={register.getError("email")}
            className="w-full"
          />

          <TextInput
            label="Katasandi"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Katasandi"
            type="password"
            isError={register.isFieldError("password")}
            errorHint={register.getError("password")}
            className="w-full"
          />

          <TextInput
            label="Konfirmasi Katasandi"
            value={data.password_confirmation}
            onChange={(e) =>
              setData({ ...data, password_confirmation: e.target.value })
            }
            placeholder="Katasandi"
            type="password"
            isError={register.isFieldError("password_confirmation")}
            errorHint={register.getError("password_confirmation")}
            className="w-full"
          />

          <Button
            isLoading={register.isLoading}
            className="w-full"
            variant={"primary"}
          >
            Daftar
          </Button>

          <div className="mt-4">
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

export default UserRegisterPage;
