import { NavLink } from "react-router";
import IonIcon from "@reacticons/ionicons";
import Button from "./Button";
import axios from "axios";
import { BASE_API_URL } from "../lib/config";
import { getSession, useAction } from "../lib/helper";

const Header = () => {
    const loggedUser = JSON.parse(localStorage.getItem('session'));

    const logout = useAction({
        fn: async () => {
            const result = axios.post(BASE_API_URL + '/auth/logout', {}, {
                headers: {
                    Authorization: 'Bearer ' + getSession().token,
                }
            });
            return result;
        },
        onSuccess: () => {
            localStorage.removeItem('session');
            window.location.reload();
        },
        onError: () => {
            localStorage.removeItem('session');
            window.location.reload();
        }
    })


    return (
        <header className='fixed bg-white/80  backdrop-blur-xl w-full h-32 z-10 border-b border-b-gray-100'>
            <div className="p-4 border-b border-b-gray-50">
                <div className='mx-12 flex flex-col md:flex-row items-center justify-between '>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <a href="/">
                            <h1 className="text-xl font-bold">Papi Kos</h1>
                        </a>
                        <input
                            type="text"
                            placeholder="Cari tempat, nama kos"
                            className="rounded-full px-5 py-3 w-full md:w-96 outline-none bg-gray-200 transition text-xs"
                        />
                    </div>
                    {
                        !loggedUser ?
                            <NavLink to="/login">
                                <button className="bg-blue-500 text-white px-8 py-2 rounded-md mt-4 md:mt-0 hover:bg-blue-600 transition shadow-md shadow-blue-200">
                                    Masuk
                                </button>
                            </NavLink> : (
                                <div className="flex gap-4 items-center">
                                    <p className="tex-xs py-2 px-3 bg-zinc-100 rounded-xl text-blue-500 flex items-center justify-center gap-2">
                                        <IonIcon name="person" />
                                        {loggedUser.user.name}</p>
                                    {
                                        loggedUser.user.role == 'ADMIN' ?
                                            (
                                                <a href="/admin" className="hover:underline text-blue-500">Admin Dashboard
                                                </a>
                                            )
                                            : loggedUser.user.role == 'PEMILIK_KOS' ? (
                                                <a href="/pemilik-kos" className="hover:underline text-blue-500">Dashboard
                                                </a>
                                            ) : null
                                    }
                                    <Button onClick={logout.execute} isLoading={logout.isLoading}>Logout</Button>
                                </div>
                            )
                    }
                </div>
            </div>
            <div className='p-4 flex mx-12 justify-between'>
                <ul className='flex flex-row gap-4'>
                    <li className='text-gray-500 text-sm flex gap-2 items-center cursor-pointer hover:text-blue-500'>Kos Laki laki <IonIcon name='chevron-down' /></li>
                    <li className='text-gray-500 text-sm flex gap-2 items-center cursor-pointer hover:text-blue-500'>Kos Laki laki <IonIcon name='chevron-down' /></li>
                    <li className='text-gray-500 text-sm flex gap-2 items-center cursor-pointer hover:text-blue-500'>Kos Laki laki <IonIcon name='chevron-down' /></li>
                    <li className='text-gray-500 text-sm flex gap-2 items-center cursor-pointer hover:text-blue-500'>Kos Laki laki <IonIcon name='chevron-down' /></li>
                </ul>

                {
                    loggedUser?.user?.role == 'USER' &&
                    <a href="/booking" className="text-blue-500 rounded-full relative group">
                        Booking Saya
                        <div className="w-full h-1 bg-blue-500 absolute bottom-0 left-0 scale-x-0 group-hover:scale-x-100 duration-300 origin-left"></div>
                    </a>
                }
            </div>
        </header>
    );
};

export default Header;