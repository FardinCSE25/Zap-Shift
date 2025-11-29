import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    });
                });
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl  p-8">
            <title>Zap Shift - Payment Success</title>

            {/* Header */}
            <h2 className="text-center text-3xl md:text-4xl font-bold text-secondary py-5">
                Payment Successful!
            </h2>

            {/* Success Card */}
            <div className="max-w-2xl mx-auto bg-linear-to-br from-[#fafafa] to-[#eaeaea] rounded-xl p-10 border border-secondary/20 shadow-sm text-center">

                {/* Success Icon */}
                <FaCheckCircle className="text-primary text-6xl mx-auto mb-5" />

                <p className="text-xl font-semibold text-secondary mb-6">
                    Thank you! Your payment has been successfully processed.
                </p>

                {/* Info Box */}
                <div className="bg-white border rounded-xl p-6 text-left space-y-4 shadow-sm">

                    <p className="text-lg text-secondary font-medium">
                        <span className="font-bold text-primary">Transaction ID:</span> {paymentInfo.transactionId}
                    </p>

                    <p className="text-lg text-secondary font-medium">
                        <span className="font-bold text-primary">Tracking ID:</span> {paymentInfo.trackingId}
                    </p>

                </div>

                <p className="text-gray-600 mt-6">
                    Use your Tracking ID to monitor parcel delivery progress.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
