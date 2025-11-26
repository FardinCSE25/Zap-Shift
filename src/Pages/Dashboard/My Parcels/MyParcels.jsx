import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaMagnifyingGlass, FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })

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
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
    
            <div className='w-11/12 mx-auto my-20 bg-base-200 rounded-[20px]'>
                <title>Zap Shift-My Parcels</title>
                <h1 className='text-center text-3xl text-secondary py-8 '>
                    All of my Parcels : {parcels.length}
                </h1>
                <div className="overflow-x-auto ml-16">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Sl no</th>
                                <th>Parcel Name</th>
                                <th>Cost</th>
                                <th>Payment</th>
                                <th>Delivery Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcel, index) => <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>
                                        {
                                            parcel.paymentStatus === 'paid' ?
                                                <span className='text-secondary'>Paid</span> :
                                                <Link to={`/dashboard/payment/${parcel._id}`}>
                                                    <button className='btn bg-primary text-black'>
                                                        Pay
                                                    </button>
                                                </Link>
                                        }
                                    </td>
                                    <td>{parcel.deliveryStatus}</td>
                                    <td>
                                        <button className="btn btn-square hover:bg-primary">
                                            <FaMagnifyingGlass />
                                        </button>
                                        <button className="btn btn-square hover:bg-primary mx-2">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleParcelDelete(parcel._id)} className="btn btn-square hover:bg-primary">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        
    );
};

export default MyParcels;