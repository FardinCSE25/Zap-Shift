import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hooks/UseAuth';

const ManageDeliveries = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'rider-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=rider-assigned`)
            return res.data;
        }
    })

    const handleDeliveryStatusUpdate = (parcel, status) => {
        const statusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        }

        let message = `Parcel Status is updated with ${status.split('_').join(' ')}`

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="p-4 sm:p-6 md:p-10">
            <title>Zap Shift - Manage Deliveries</title>

            {/* Header */}
            <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
                    Parcels Pending Pickup
                    <span className="text-primary ml-2">({parcels.length})</span>
                </h2>
                <p className="text-secondary/70 mt-1 text-sm sm:text-base">
                    Manage all assigned parcels & update their delivery progress.
                </p>
            </div>

            {/* Table Card */}
            <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-secondary/20 p-2 sm:p-4">
                <table className="table w-full min-w-[600px] sm:min-w-full">
                    <thead className="bg-secondary/10 text-secondary font-semibold uppercase text-xs sm:text-sm">
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Delivery Action</th>
                            <th>Status</th>
                            <th>More</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, i) => (
                            <tr
                                key={parcel._id}
                                className="hover:bg-primary/10 transition"
                            >
                                <th className="text-secondary text-sm sm:text-base">{i + 1}</th>

                                <td className="font-medium text-secondary text-sm sm:text-base">{parcel.parcelName}</td>

                                {/* Accept / Reject Buttons */}
                                <td>
                                    {
                                        parcel.deliveryStatus === 'rider-assigned'
                                            ? (
                                                <div className="flex gap-1 sm:gap-2 flex-wrap">
                                                    <button
                                                        onClick={() => handleDeliveryStatusUpdate(parcel, 'rider-on-way')}
                                                        className="btn btn-xs sm:btn-sm bg-primary text-secondary hover:bg-primary/80 border-none"
                                                    >
                                                        Accept
                                                    </button>

                                                    <button className="btn btn-xs sm:btn-sm bg-secondary text-white hover:bg-secondary/80 border-none">
                                                        Reject
                                                    </button>
                                                </div>
                                            )
                                            : <span className="text-primary font-bold text-sm sm:text-base">Accepted</span>
                                    }
                                </td>

                                {/* Status */}
                                <td>
                                    {
                                        parcel.deliveryStatus === 'parcel-picked-up' &&
                                        <span className="text-primary font-semibold text-sm sm:text-base">Parcel picked up</span>
                                    }
                                </td>

                                {/* Actions */}
                                <td className={`${parcel.deliveryStatus === 'rider-assigned' && 'hidden'}`}>
                                    <div className="flex gap-1 sm:gap-2 flex-wrap">
                                        <button
                                            onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel-picked-up')}
                                            className={`btn btn-xs sm:btn-sm bg-secondary text-white hover:bg-secondary/80 border-none
                                                ${parcel.deliveryStatus === 'parcel-picked-up' && 'hidden'}
                                            `}
                                        >
                                            Mark Picked Up
                                        </button>

                                        <button
                                            onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel-delivered')}
                                            className="btn btn-xs sm:btn-sm bg-primary text-secondary hover:bg-primary/80 border-none"
                                        >
                                            Delivered
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageDeliveries;
