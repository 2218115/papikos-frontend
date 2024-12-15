import { NavLink } from "react-router";
import { useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Toast from "../../components/Toast";
import { BASE_API_URL } from "../../lib/config";
import { useAction } from "../../lib/helper";

const UserLoginPage = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errorToast, setErrorToast] = useState(null);

    const login = useAction({
        fn: async (params) => {
            const result = await axios.post(BASE_API_URL + "/auth/login", params);
            return result;
        },
        onSuccess: (data) => {
            localStorage.setItem("session", JSON.stringify(data.data));
            window.location.replace("/");
        },
        onError: (error) => {
            if (error.status == 422) {
                setErrorToast(error.data.message);
            }
        },
    });

    const handleChange = (field) => (e) => {
        setData((prevData) => ({ ...prevData, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login.execute(data);
    };

    return (
        <div>
            {errorToast && (
                <Toast
                    message={errorToast}
                    type="error"
                    duration={3000}
                    onClose={() => setErrorToast(null)}
                />
            )}
            <main className="flex items-center justify-center h-screen">
                <form
                    className="flex items-center flex-col p-8 border border-gray-200 rounded-xl"
                    onSubmit={handleSubmit}
                >
                    <h1 className="font-bold text-lg mb-12">Masuk Ke Akun Anda</h1>

                    <TextInput
                        label="Email"
                        value={data.email}
                        onChange={handleChange("email")}
                        placeholder="Masukkan Email Anda"
                        isError={login.isFieldError("email")}
                        errorHint={login.getError("email")}
                    />

                    <TextInput
                        label="Katasandi"
                        value={data.password}
                        onChange={handleChange("password")}
                        placeholder="Masukkan Katasandi"
                        type="password"
                        isError={login.isFieldError("password")}
                        errorHint={login.getError("password")}
                    />

                    <Button
                        isLoading={login.isLoading}
                        className="w-full mt-4"
                        variant="primary"
                        type="submit"
                    >
                        Masuk
                    </Button>

                    <div className="mt-4">
                        <p className="text-sm text-gray-500">
                            Belum punya akun?{" "}
                            <NavLink className="text-blue-500 font-bold" to="/register">
                                Register
                            </NavLink>
                        </p>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default UserLoginPage;
