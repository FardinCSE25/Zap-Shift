import React from 'react';
import Logo from "../Components/Logo/Logo"
import img from '../assets/authImage.png'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className=''>
            <div className="mt-10 max-w-[1600px] mx-auto">
                <Logo />
            </div>
            <div className='flex h-[800px] items-center'>
                <div className='flex-1'>
                    <Outlet />
                </div>
                <div className='flex-1 h-full bg-[#FAFDF0]'>
                    <div className='flex items-center justify-center'>
<img src={img} alt="" />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;