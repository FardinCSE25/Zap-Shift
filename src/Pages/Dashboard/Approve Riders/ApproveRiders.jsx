import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Rider status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = rider => updateRiderStatus(rider, 'Approved');
    const handleRejection = rider => updateRiderStatus(rider, 'Rejected');

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

            <title>Zap Shift - Approve Riders</title>

            {/* Header */}
            <h1 className="text-center text-3xl md:text-4xl font-bold text-secondary py-5">
                Riders Pending Approval <span className="text-primary ml-2">({riders.length})</span>
            </h1>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                        <tr>
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id} className="hover:bg-primary/10 transition">
                                <th className="text-secondary">{index + 1}</th>
                                <td className="text-secondary font-medium">{rider.name}</td>
                                <td className="text-secondary">{rider.email}</td>
                                <td className="text-secondary">{rider.district}</td>
                                <td>
                                    <span className={`font-semibold ${rider.status === 'Approved' ? 'text-primary' :
                                            rider.status === 'Pending' ? 'text-secondary' : 'text-red-500'
                                        }`}>
                                        {rider.status}
                                    </span>
                                </td>
                                <td className="text-secondary font-medium">{rider.workStatus}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleApproval(rider)}
                                        className="btn btn-square bg-primary text-secondary border-none hover:bg-primary/80 shadow-md"
                                    >
                                        <FaUserCheck />
                                    </button>

                                    <button
                                        onClick={() => handleRejection(rider)}
                                        className="btn btn-square bg-primary text-secondary border-none hover:bg-primary/80 shadow-md"
                                    >
                                        <IoPersonRemoveSharp />
                                    </button>

                                    <button
                                        className="btn btn-square bg-secondary text-primary border-none hover:bg-secondary/80 shadow-md"
                                    >
                                        <FaTrashCan />
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

export default ApproveRiders;
