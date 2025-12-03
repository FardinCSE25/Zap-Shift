import React, { use } from "react";
import agent from "../../../assets/customer-top.png";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <div className="mt-20 md:mt-32 mb-20 md:mb-28 px-4">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center text-center mb-12 md:mb-16">

        <img src={agent} alt=""
          className="w-20 md:w-28 animate-bounce"
        />

        <h1
          className="
        text-2xl 
        sm:text-3xl 
        md:text-4xl         
        mt-4 md:mt-6 
        font-bold 
        text-secondary 
        tracking-wide
      "
        >
          What Our Customers Say
        </h1>

        <p
          className="
        text-accent 
        mt-2 md:mt-3 
        max-w-xs 
        sm:max-w-md 
        md:max-w-xl         
        text-sm 
        sm:text-base
      "
        >
          Real voices, real experiences. See what our users think about our fast,
          reliable and hassle-free parcel delivery system.
        </p>
      </div>

      {/* Swiper */}
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={20}
        slidesPerView={1}          // MOBILE
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },   // small phones
          768: { slidesPerView: 2, spaceBetween: 30 },   // tablets
          1024: { slidesPerView: 3, spaceBetween: 40 },  // desktops (your original design)
        }}
        coverflowEffect={{
          rotate: 20,
          stretch: 30,
          depth: 250,
          modifier: 1,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper px-4"   // small padding on mobile for nice spacing
      >

        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
