import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import "./navbar.css";

const Navbar = () => {
    const links = <>
        <li className='px-5 py-4'><NavLink to="/services">Services</NavLink></li>
        <li className='px-5 py-4'><NavLink to="/coverage">Coverage</NavLink></li>
        <li className='px-5 py-4'><NavLink to="/about-us">About Us</NavLink></li>
    </>
    return (
        <div className='py-7 flex justify-center items-center'>
            <div className="navbar py-6 px-8 rounded-[20px] bg-white shadow-sm">
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
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;