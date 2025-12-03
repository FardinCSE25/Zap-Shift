import React from 'react';
import Logo from "../Components/Logo/Logo";
import img from '../assets/authImage.png';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='min-h-screen flex flex-col lg:flex-row'>

            {/* Left side */}
            <div className='flex-1 flex flex-col'>
                {/* Logo */}
                <div className="mt-5 ml-5 lg:ml-10">
                    <Logo />
                </div>

                {/* Form */}
                <div className='flex-1 flex items-center justify-center px-4'>
                    <div className='w-full max-w-md lg:max-w-lg'>
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Right side image */}
            <div className='flex-1 hidden lg:flex bg-[#FAFDF0] h-[1200px]'>
                <div className='m-auto'>
                    <img src={img} alt="Auth Illustration" className='max-h-[80vh] object-contain' />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
