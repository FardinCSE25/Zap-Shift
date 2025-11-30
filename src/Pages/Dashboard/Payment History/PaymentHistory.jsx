import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

            <title>Zap Shift - Payment History</title>

            {/* Header */}
            <h1 className="text-center text-3xl md:text-4xl font-bold text-secondary py-5">
                Payment History <span className="text-primary ml-2">({payments.length})</span>
            </h1>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                        <tr>
                            <th>Sl No</th>
                            <th>Parcel Name</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                            <th>Transaction ID</th>
                            <th>Tracking ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index) => (
                            <tr
                                key={payment._id}
                                className="hover:bg-primary/10 transition"
                            >
                                <th className="text-secondary">{index + 1}</th>
                                <td className="text-secondary font-medium">{payment.parcelName}</td>
                                <td className="text-secondary font-medium">{payment.amount}</td>
                                <td className="text-secondary">{new Date(payment.paidAt).toLocaleString()}</td>
                                <td className="text-secondary font-mono">{payment.transactionId}</td>
                                <td className="text-primary font-semibold">{payment.trackingId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
