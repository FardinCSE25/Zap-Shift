import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaMagnifyingGlass, FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to regain this in future!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#CAEB66",
            cancelButtonText: "<span style='color:black; display:block;'>Cancel</span>",
            confirmButtonText: "Yes, Delete it"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

            <title>Zap Shift - My Parcels</title>

            {/* Header */}
            <h1 className="text-center text-3xl md:text-4xl font-bold text-secondary py-5">
                My Parcels <span className="text-primary ml-2">({parcels.length})</span>
            </h1>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table">
                    <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                        <tr>
                            <th>Sl No</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className="hover:bg-primary/10 transition"
                                >
                                    <th className="text-secondary">{index + 1}</th>
                                    <td className="text-secondary font-medium">{parcel.parcelName}</td>
                                    <td className="text-secondary">{parcel.cost}</td>

                                    {/* Payment */}
                                    <td>
                                        {
                                            parcel.paymentStatus === 'paid'
                                                ? <span className="text-primary font-semibold">Paid</span>
                                                : (
                                                    <Link to={`/dashboard/payment/${parcel._id}`}>
                                                        <button className="btn btn-sm bg-primary text-secondary border-none hover:bg-primary/80">
                                                            Pay
                                                        </button>
                                                    </Link>
                                                )
                                        }
                                    </td>

                                    <td className="text-secondary">{parcel.deliveryStatus}</td>

                                    {/* Actions */}
                                    <td className="flex gap-2">
                                        <button
                                            className="btn btn-square bg-secondary text-white hover:bg-secondary/80 border-none"
                                        >
                                            <FaMagnifyingGlass />
                                        </button>

                                        <button
                                            className="btn btn-square bg-primary text-secondary hover:bg-primary/80 border-none"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() => handleParcelDelete(parcel._id)}
                                            className="btn btn-square bg-secondary text-white hover:bg-secondary/80 border-none"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;
