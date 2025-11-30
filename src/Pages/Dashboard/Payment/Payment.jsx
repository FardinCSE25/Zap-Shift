import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading';

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        }
    });

    const handlePayment = async () => {
        const paymentInfo = {
            parcelId: parcel._id,
            parcelName: parcel.parcelName,
            cost: parcel.cost,
            SenderEmail: parcel.SenderEmail,
            trackingId : parcel.trackingId
        };

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    if (isLoading) return <Loading />;

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-8">
            <title>Zap Shift - Payment</title>

            {/* Header */}
            <h1 className="text-center text-3xl md:text-4xl font-bold text-secondary py-5">
                Complete Your Payment
            </h1>

            {/* Content Card */}
            <div className="max-w-2xl mx-auto bg-linear-to-br from-[#fafafa] to-[#eaeaea] rounded-xl p-8 border border-secondary/20 shadow-sm">

                <h2 className="text-2xl font-bold text-secondary mb-3 text-center">
                    {parcel.parcelName}
                </h2>

                <div className="mt-6 flex justify-between text-lg font-semibold px-4 py-3 bg-white rounded-lg border">
                    <span className="text-secondary">Amount to Pay:</span>
                    <span className="text-primary text-2xl font-bold">৳{parcel.cost}</span>
                </div>

                <div className="mt-4 bg-white p-4 border rounded-lg flex justify-between items-center">
                    <span className="text-gray-500">Sender Email:</span>
                    <span className="text-secondary font-medium">{parcel.SenderEmail}</span>
                </div>

                {/* Button */}
                <button
                    onClick={handlePayment}
                    className="btn w-full bg-primary text-secondary border-none mt-8 py-3 font-bold text-lg
                    hover:bg-primary/80"
                >
                    Pay Now
                </button>

            </div>
        </div>
    );
};

export default Payment;
