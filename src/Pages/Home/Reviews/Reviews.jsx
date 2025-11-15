import React, { use } from 'react';
import agent from "../../../assets/customer-top.png"
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise)
  console.log(reviews);

  return (
    <div>
      <div>
        <div className='flex justify-center mb-10 mt-24'>
          <img src={agent} alt="" />
        </div>
        <h1 className='text-3xl mb-2 font-semibold text-center text-secondary'>
          What our customers are sayings
        </h1>
        <p className='text-accent mb-12 text-center'>
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>
      <>
        <Swiper
          loop={true}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay,]}
          className="mySwiper"
        >
          {
            reviews.map(review => {
              return (
                <SwiperSlide key={review.id}>
                  <ReviewCard review={review}></ReviewCard>
                </SwiperSlide>
              )
            })
          }

        </Swiper>
      </>
    </div >
  );
};

export default Reviews;