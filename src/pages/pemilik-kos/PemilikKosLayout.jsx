import React, { useEffect, useLayoutEffect, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import { Outlet } from "react-router";
import { getSession } from "../../lib/helper";

const PemilikKosLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(
        JSON.parse(localStorage.getItem("sidebar"))
    );

    useEffect(() => {
        localStorage.setItem("sidebar", isSidebarOpen);
    }, [isSidebarOpen]);

    useEffect(() => {
        // getSession();
    }, []);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="h-screen p-5 flex">
                <aside
                    className={`${isSidebarOpen ? "w-64" : "w-16 flex flex-col items-center"
                        } bg-white transition-all duration-300 rounded-xl shadow-sm`}
                >
                    <div className="p-4 border-b flex items-center justify-between">
                        {isSidebarOpen && (
                            <h2 className="text-xl font-bold text-blue-500">Papi Kos</h2>
                        )}
                        <button
                            className=" text-gray-500 hover:text-gray-700"
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                        >
                            <IonIcon
                                className="text-xl"
                                name={isSidebarOpen ? "chevron-back" : "menu-outline"}
                            />
                        </button>
                    </div>
                    <nav className="mt-4">
                        <ul
                            className={
                                isSidebarOpen
                                    ? "space-y-2  px-4"
                                    : "space-y-2 flex items-center flex-col"
                            }
                        >
                            <li>
                                <a
                                    href="/pemilik-kos"
                                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-blue-500 hover:text-white duration-200 rounded-lg"
                                >
                                    <IonIcon name="speedometer-outline" className="text-md" />
                                    {isSidebarOpen && <p className="ml-2 text-md">Dashboard</p>}
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <nav className="mt-4">
                        <ul
                            className={
                                isSidebarOpen
                                    ? "space-y-2  px-4"
                                    : "space-y-2 flex items-center flex-col"
                            }
                        >
                            <li>
                                <a
                                    href="/pemilik-kos/kos"
                                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-blue-500 hover:text-white duration-200 rounded-lg"
                                >
                                    <IonIcon name="business" className="text-md" />
                                    {isSidebarOpen && <p className="ml-2 text-md">Kos Saya</p>}
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <nav className="mt-4">
                        <ul
                            className={
                                isSidebarOpen
                                    ? "space-y-2  px-4"
                                    : "space-y-2 flex items-center flex-col"
                            }
                        >
                            <li>
                                <a
                                    href="/pemilik-kos/booking"
                                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-blue-500 hover:text-white duration-200 rounded-lg"
                                >
                                    <IonIcon name="calendar" className="text-md" />
                                    {isSidebarOpen && <p className="ml-2 text-md">Booking</p>}
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* <nav className="mt-4">
                        <ul
                            className={
                                isSidebarOpen
                                    ? "space-y-2  px-4"
                                    : "space-y-2 flex items-center flex-col"
                            }
                        >
                            <li>
                                <a
                                    href="/pemilik-kos/ulasan"
                                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-blue-500 hover:text-white duration-200 rounded-lg"
                                >
                                    <IonIcon name="star" className="text-md" />
                                    {isSidebarOpen && <p className="ml-2 text-md">Ulasan</p>}
                                </a>
                            </li>
                        </ul>
                    </nav> */}

                    <nav className="mt-4">
                        <ul
                            className={
                                isSidebarOpen
                                    ? "space-y-2  px-4"
                                    : "space-y-2 flex items-center flex-col"
                            }
                        >
                            <li>
                                <a
                                    href="/pemilik-kos/user-info"
                                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-blue-500 hover:text-white duration-200 rounded-lg"
                                >
                                    <IonIcon name="person" className="text-md" />
                                    {isSidebarOpen && (
                                        <p className="ml-2 text-md">Informasi Akun</p>
                                    )}
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <nav className="mt-4">
                        <ul
                            className={
                                isSidebarOpen
                                    ? "space-y-2  px-4"
                                    : "space-y-2 flex items-center flex-col"
                            }
                        >
                            <li>
                                <a
                                    href="/"
                                    className="flex items-center px-3 py-3 text-gray-700 hover:bg-blue-500 hover:text-white duration-200 rounded-lg"
                                >
                                    <IonIcon name="home" className="text-md" />
                                    {isSidebarOpen && <p className="ml-2 text-md">Beranda</p>}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 h-screen overflow-y-auto">
                <div className="">{<Outlet />}</div>
            </main>
        </div>
    );
};

export default PemilikKosLayout;
