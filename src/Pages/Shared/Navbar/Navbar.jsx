import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import Loading from '../../../Components/Loading'
import { Link, NavLink } from 'react-router';
import "./navbar.css";
import UseAuth from '../../../Hooks/UseAuth';
import useRole from '../../../Hooks/useRole';

const Navbar = () => {
    const { user, logOut } = UseAuth();
    const { isLoading, role } = useRole()

    if (isLoading) {
        return <Loading />
    }

    const handleLogout = () => {
        logOut().catch(error => console.log(error));
    };

    const links = (
        <>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/coverage">Coverage</NavLink></li>
            <li><NavLink to="/about-us">About Us</NavLink></li>
            <li><NavLink to="/send-parcel">Send Parcel</NavLink></li>
            {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
        </>
    );

    return (
        <div className="py-4 flex justify-center w-full">
            <div className="navbar w-full bg-white shadow-sm px-5 py-7 rounded-xl">

                {/* LEFT — Logo + Mobile Menu */}
                <div className="navbar-start flex items-center gap-2">

                    {/* Mobile Hamburger */}
                    <div className="dropdown lg:hidden">
                        <button tabIndex={0} className="btn btn-ghost p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-lg mt-3 w-56 p-3 shadow border border-gray-200 z-20">

                            {user && (
                                <li className="flex items-center gap-3">
                                    <div className="avatar rounded-full overflow-hidden">
                                        <img src={user.photoURL} className="rounded-full w-10 h-10" />
                                    </div>
                                    <span className="font-semibold">{user.displayName}</span>
                                </li>
                            )}

                            {links}

                            {user ? (
                                <li><button onClick={handleLogout} className='btn btn-sm bg-primary text-secondary mt-2'>Logout</button></li>
                            ) : (
                                <>
                                    <li><Link to="/login" className='btn btn-sm bg-primary text-secondary mt-2'>Login</Link></li>
                                    <li><Link to="/register" className='btn btn-sm bg-primary text-secondary mt-2'>Register</Link></li>
                                </>
                            )}

                            <li><Link to="/be-rider" className='btn btn-sm btn-outline text-secondary border-primary mt-2'>Be a Rider</Link></li>
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="ml-5 cursor-pointer"><Logo /></Link>
                </div>

                {/* CENTER (Desktop Menu) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2">
                        {links}
                    </ul>
                </div>

                {/* RIGHT — Buttons (Desktop Only) */}
                <div className="navbar-end hidden mr-5 lg:flex items-center gap-4">

                    {user && (
                        <div className="avatar w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                            <img src={user.photoURL} className="object-cover w-full h-full" />
                        </div>
                    )}

                    {user ? (
                        <button onClick={handleLogout} className="btn bg-primary text-secondary hover:bg-white hover:border-primary">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="btn bg-primary text-secondary hover:bg-white hover:border-primary">
                                Login
                            </Link>
                            <Link to="/register" className="btn bg-primary text-secondary hover:bg-white hover:border-primary">
                                Register
                            </Link>
                        </>
                    )}

                    {
                        role !== 'rider' && 
                            <Link to="/be-rider" className="btn btn-outline border-2 border-primary text-secondary hover:bg-primary">
                                Be a Rider
                            </Link>
                        
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;
