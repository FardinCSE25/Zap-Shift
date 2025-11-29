import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';

const brandLogos = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people];

const Brands = () => {
    return (
        <section className="my-32 bg-[#F5F7EB] py-16 px-4 rounded-3xl shadow-inner">
            {/* Section Title */}
            <h1 className="text-4xl font-bold text-secondary text-center mb-16 tracking-wide">
                We've Helped Thousands of Sales Teams
            </h1>

            {/* Brand Carousel */}
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={40}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 40 },
                    1280: { slidesPerView: 4, spaceBetween: 50 },
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {brandLogos.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex justify-center items-center p-6 bg-white/90 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105">
                            <img src={logo} alt={`brand-logo-${index}`} className="max-h-20 object-contain" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Brands;
