import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;

    return (
        <div
            className="
    bg-white/80 backdrop-blur-xl
    shadow-xl border border-gray-200
    rounded-2xl 
    px-5 py-8              /* mobile padding */
    md:px-8 md:py-10       /* desktop padding (original) */
    transition-all duration-300 
    hover:shadow-2xl hover:-translate-y-2
    max-w-sm mx-auto
  "
        >
            <FaQuoteLeft className="text-primary text-2xl md:text-3xl mb-4 opacity-80" />

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {testimonial}
            </p>

            <div className="border-t border-dashed border-gray-300 my-6"></div>

            <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md">
                    <img
                        src={user_photoURL}
                        alt={userName}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h3 className="font-semibold text-base md:text-lg text-secondary">
                        {userName}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">Verified Customer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
