import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const MainLayout = () => {
    return (
       <div className='bg-gray-100'>
         <div className='max-w-[1600px] mx-auto'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
       </div>
    );
};

export default MainLayout;