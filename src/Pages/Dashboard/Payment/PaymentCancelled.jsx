import React from 'react';
import { Link } from 'react-router';
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelled = () => {
    return (
        <div className="max-w-2xl mx-auto bg-linear-to-br from-[#fff5f5] to-[#ffe9e9] rounded-xl p-10 border border-red-200 shadow-sm text-center mt-10">

            {/* Cancel Icon */}
            <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-5" />

            <p className="text-xl font-semibold text-red-600 mb-3">
                Payment Cancelled!
            </p>

            <p className="text-gray-600 mb-6">
                Your payment could not be completed. You can try again anytime.
            </p>

            {/* Button */}
            <div className="flex justify-center">
                <Link to="/dashboard/my-parcels">
                    <button className="btn bg-primary text-black px-6 rounded-lg shadow">
                        Try Again
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;
