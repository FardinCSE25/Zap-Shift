import React, { use } from "react";
import agent from "../../../assets/customer-top.png";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <div className="mt-32 mb-28">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center text-center mb-16">
        <img src={agent} alt="" className="w-28 animate-bounce" />

        <h1 className="text-4xl mt-6 font-bold text-secondary tracking-wide">
          What Our Customers Say
        </h1>

        <p className="text-accent mt-3 max-w-xl">
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
        spaceBetween={40}
        slidesPerView={3}
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
        pagination={{
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
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
