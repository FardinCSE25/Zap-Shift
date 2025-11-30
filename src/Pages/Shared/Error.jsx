import React from 'react';
import { Link } from 'react-router';
import error from "../../assets/18499954_bubble_gum200_89 1.png"
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const Error = () => {
    return (
        <div className='bg-gray-100'>
            <div className='max-w-[1600px] mx-auto'>
                <Navbar />
                <div className='max-w-[750px] w-full mx-auto px-4 pt-20 pb-32 inter text-center'>

                    <img className='pb-1 mx-auto w-60 md:w-80' src={error} alt="error" />

                    <h1 className='font-semibold text-secondary text-3xl md:text-5xl mb-4'>
                        Oops, page not found!
                    </h1>

                    <p className='text-sm md:text-base mb-6 dark:text-white text-gray-600'>
                        The page you are looking for is not available.
                    </p>

                    <div className='mx-auto'>
                        <Link
                            to={"/"}
                            className='px-6 py-3 md:py-4 btn bg-primary text-black w-full md:w-auto'
                        >
                            Go Back!
                        </Link>
                    </div>

                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Error;
