import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';

const brandLogos = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people];


const Brands = () => {
    return (
        <div className='my-16'>
            <h1 className='text-3xl text-secondary text-center mb-16 font-semibold'>
                We've helped thousands of sales teams
            </h1>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 800,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                {

                    brandLogos.map((logo, index) => <SwiperSlide key={index}><img src={logo} alt="brand-logo" /></SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Brands;