import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, 'parcel-delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`)
            return res.data;
        }
    })

    const handleRiderPayment = (parcel) => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8;
        } else {
            return parcel.cost * 0.5;
        }
    }

    return (
        <div className="p-6 md:p-10">
            <title>Zap Shift - Completed Deliveries</title>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                    Completed Deliveries
                    <span className="text-primary ml-2">({parcels.length})</span>
                </h2>
                <p className="text-secondary/70 mt-1">
                    All parcels you delivered and your payout summary.
                </p>
            </div>

            {/* Table Card */}
            <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-secondary/20 p-4">
                <table className="table">
                    <thead className="bg-secondary/10 text-secondary font-semibold uppercase text-sm">
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, i) => (
                            <tr key={parcel._id} className="hover:bg-primary/10 transition">
                                <th className="text-secondary">{i + 1}</th>

                                <td className="font-medium text-secondary">{parcel.parcelName}</td>

                                <td>{parcel.created_at &&
                                    new Date(parcel.created_at).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                }</td>

                                <td>{parcel.senderDistrict}</td>

                                <td className="font-semibold text-secondary">{parcel.cost}</td>

                                <td className="font-bold text-primary">{handleRiderPayment(parcel)}</td>

                                <td>
                                    <button className="btn btn-sm bg-primary text-secondary hover:bg-primary/80 border-none shadow">
                                        Cash out
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;