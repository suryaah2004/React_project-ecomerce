import React, { useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'


const Admin = () => {
    const userString = localStorage.getItem("user");
    if (!userString) return <Navigate to="/login" replace />;

    const user = JSON.parse(userString);

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    const [openUsers, setOpenUsers] = useState(false);
    const [openProducts, setOpenProducts] = useState(false)

    return (
        <div className="flex h-screen overflow-x-hidden">
            <aside className="w-64 fixed h-screen bg-gray-900 text-white">
                <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">Admin</span>
                    </div>
                </div>

                <nav className="mt-5 px-2">
                    <div className="space-y-4">

                        <div>
                            <button
                                onClick={() => setOpenUsers(!openUsers)}
                                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 hover:bg-gray-700"
                            >
                                <span>Users</span>
                                <span>{openUsers ? "▲" : "▼"}</span>
                            </button>

                            {openUsers && (
                                <div className="ml-4 mt-2 space-y-2">


                                    <Link
                                        to="/adminDashboard/users"
                                        className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white text-sm"
                                    >
                                        Users List
                                    </Link>

                                </div>
                            )}
                        </div>

                        <Link
                            to="/adminDashboard/categories"
                            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Categories
                        </Link>
                        <div>
                            <button
                                onClick={() => setOpenProducts(!openProducts)}
                                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 hover:bg-gray-700"
                            >
                                <span>Products</span>
                                <span>{openProducts ? "▲" : "▼"}</span>
                            </button>

                            {openProducts && (
                                <div className="ml-4 mt-2 space-y-2">

                                    <Link
                                        to="/adminDashboard/products"
                                        className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white text-sm"
                                    >
                                        Products List
                                    </Link>

                                    <Link
                                        to="/adminDashboard/products/add"
                                        className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white text-sm"
                                    >
                                        Add Products
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link
                            to="/adminDashboard/orders"
                            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Orders
                        </Link>
                    </div>
                </nav>
            </aside>

            <main className="w-[calc(100%-16rem)] ml-64 p-6 bg-gray-100 overflow-x-hidden">
                <Outlet />
            </main>
        </div>

    );
};

export default Admin;



