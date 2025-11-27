import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import "./navbar.css";
import UseAuth from '../../../Hooks/UseAuth';

const Navbar = () => {
    const { user, logOut } = UseAuth()

    const handleLogout = () => {
        logOut()
            .then()
            .catch(error => {
                console.log(error);
            })
    }
    const links = <>
        <li className='px-5 py-4'><NavLink to="/services">Services</NavLink></li>
        <li className='px-5 py-4'><NavLink to="/coverage">Coverage</NavLink></li>
        <li className='px-5 py-4'><NavLink to="/about-us">About Us</NavLink></li>
        <li className='px-5 py-4'><NavLink to="/send-parcel">Send Parcel</NavLink></li>

        {
            user && <>
                <li className='px-5 py-4'><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>


    return (
        <div className='py-7 flex justify-center items-center'>
            <div className="navbar py-2 px-8 rounded-[20px] bg-white shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="pl-3 mb-4 text-xl"><Logo /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="text-accent menu menu-horizontal">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user &&
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn w-12 btn-ghost btn-circle avatar"
                        >
                            <div className="border-2 border-primary rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    referrerPolicy="no-referrer"
                                    src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                        </div>
                    }
                    {
                        user &&
                        <Link onClick={handleLogout} className="btn md:mr-4 mr-2 ml-4 hover:bg-white hover:border-2 hover:border-primary text-secondary bg-primary">
                            Logout
                        </Link>
                    }
                    {
                        !user &&
                        <Link to="/login" className="btn md:mr-4 mr-1 hover:bg-white hover:border-2 hover:border-primary text-secondary bg-primary">
                            Login
                        </Link>
                    }

                    {
                        !user &&
                        <Link to="/register" className="btn md:mr-4 mr-1 hover:bg-white hover:border-2 hover:border-primary text-secondary bg-primary">
                            Register
                        </Link>
                    }
                    <Link to="/be-rider" className="btn btn-outline border-2 hover:bg-primary border-primary bg-gray-100 text-secondary">
                        Be a Rider
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;