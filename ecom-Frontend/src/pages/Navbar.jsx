import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../contextAPI/Authcontext';
import { logOut } from '../service/All-API';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user } = useContext(userContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        logOut()
         localStorage.clear();
        navigate('/login')
    }

    return (
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative bg-black z-10">
            <div className="text-white font-bold text-2xl">Demo</div>

             {/* Desktop Menu  */}
            <div className="hidden md:flex space-x-10 text-white font-medium">
                <a href="#" className="hover:text-yellow-300 transition">Home</a>
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="hover:text-yellow-300 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to={'/login'}
                        className="hover:text-yellow-300 transition"
                    >
                        Login
                    </Link>
                )}
                <a href="#" className="hover:text-yellow-300 transition">Products</a>
                <a href="#" className="hover:text-yellow-300 transition">Categories</a>
                <a href="#" className="hover:text-yellow-300 transition">Contact</a>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden relative">
                <button onClick={() => setOpen(!open)} className="text-white focus:outline-none">
                    <i className="fa fa-bars text-2xl"></i>
                </button>

                {open && (
                    <div className="absolute top-20 right-6 bg-white shadow-lg rounded-lg p-6 w-48">
                        <div className="flex flex-col space-y-4">
                            <a href="#" className="hover:text-yellow-500 transition">Home</a>
                            <a href="#" className="hover:text-yellow-500 transition">Login</a>
                            <a href="#" className="hover:text-yellow-500 transition">Products</a>
                            <a href="#" className="hover:text-yellow-500 transition">Categories</a>
                            <a href="#" className="hover:text-yellow-500 transition">Contact</a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )

}



export default Navbar
