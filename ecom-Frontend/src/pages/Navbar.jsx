import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
      
        <nav className="w-full fixed top-0 left-0 bg-black z-50 px-6 py-4 flex justify-between items-center">

            <div className="text-white font-bold text-2xl">Demo</div>
            <div className="hidden md:flex space-x-10 text-white font-medium items-center">
                <Link to="/" className="hover:text-yellow-300 transition">Home</Link>

                <Link to="/order/myOrder" className="hover:text-yellow-300 transition">MyOrders</Link>

          
                {user?.role === "admin" && (
                    <Link to="/adminDashboard" className="hover:text-yellow-300 transition">
                        Admin
                    </Link>
                )}

                {user ? (
                    <button onClick={handleLogout} className="hover:text-yellow-300 transition">
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="hover:text-yellow-300 transition">
                        Login
                    </Link>
                )}
            </div>

          
            <div className="md:hidden relative">
                <button onClick={() => setOpen(!open)} className="text-white focus:outline-none">
                    <i className="fa fa-bars text-2xl"></i>
                </button>

                {open && (
                    <div className="absolute top-20 right-6 bg-white shadow-lg rounded-lg p-6 w-48">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" className="hover:text-yellow-500">Home</Link>
                            <Link to="/order/myOrder" className="hover:text-yellow-500">MyOrders</Link>

                            {user?.role === "Admin" && (
                                <Link to="/adminDashboard" className="hover:text-yellow-500">
                                    Admin
                                </Link>
                            )}

                            {user ? (
                                <button onClick={handleLogout} className="hover:text-yellow-500 text-left">
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="hover:text-yellow-500">Login</Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar

