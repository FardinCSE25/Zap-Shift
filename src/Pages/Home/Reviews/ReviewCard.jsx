import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;

    return (
        <div className="
      bg-white/80 backdrop-blur-xl
      shadow-xl border border-gray-200
      rounded-2xl px-8 py-10 
      transition-all duration-300 
      hover:shadow-2xl hover:-translate-y-2
      max-w-sm mx-auto
    ">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-primary text-3xl mb-4 opacity-80" />

            {/* Review Text */}
            <p className="text-gray-600 leading-relaxed">
                {testimonial}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300 my-6"></div>

            {/* Profile */}
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                    <img
                        src={user_photoURL}
                        alt={userName}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h3 className="font-semibold text-lg text-secondary">{userName}</h3>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
