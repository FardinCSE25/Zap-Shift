import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();

    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pickup-pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pickup-pending');
            return res.data;
        }
    });

    const { data: riders = [], refetch: riderRefetch } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'Available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=Approved&district=${selectedParcel?.senderDistrict}&workStatus=Available`);
            return res.data;
        }
    });

    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel);
        riderModalRef.current.showModal();
    };

    const handleAssignRider = rider => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderEmail: rider.email,
            riderName: rider.name,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId
        };
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close();
                    parcelsRefetch();
                    riderRefetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Rider ${rider.name} assigned to "${selectedParcel.parcelName}"`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">
            <title>Zap Shift - Assign Riders</title>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-6">
                Assign Riders <span className="text-primary ml-2">({parcels.length})</span>
            </h2>

            {/* Parcels Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                        <tr>
                            <th>Sl No</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id} className="hover:bg-primary/10 transition">
                                <th className="text-secondary">{index + 1}</th>
                                <td className="text-secondary font-medium">{parcel.parcelName}</td>
                                <td className="text-secondary">{parcel.cost}</td>
                                <td className="text-secondary">{new Date(parcel.created_at).toLocaleString()}</td>
                                <td className="text-secondary">{parcel.senderDistrict}</td>
                                <td>
                                    <button
                                        onClick={() => openAssignRiderModal(parcel)}
                                        className='btn bg-primary text-secondary border-none shadow-md hover:opacity-80'
                                    >
                                        Find Riders
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rider Modal */}
            {/* Rider Modal */}
            {/* Rider Modal */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white rounded-2xl shadow-2xl w-full sm:w-[95%] max-w-[800px] h-[auto] sm:h-auto p-6 sm:p-8">
                    {/* Header */}
                    <h3 className="font-bold text-xl sm:text-2xl text-secondary mb-4 sm:mb-6 text-center sm:text-left">
                        Riders Available: {riders.length}
                    </h3>

                    {/* Table Container */}
                    <div className="overflow-x-auto overflow-y-auto max-h-[60vh] sm:max-h-[80vh]">
                        <table className="table table-auto w-full border-separate border-spacing-y-2 text-sm sm:text-base">
                            <thead className="bg-secondary/20 text-secondary uppercase font-semibold text-xs sm:text-sm">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2">Sl No</th>
                                    <th className="px-2 sm:px-4 py-2">Name</th>
                                    <th className="px-2 sm:px-4 py-2">Email</th>
                                    <th className="px-2 sm:px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.map((rider, i) => (
                                    <tr key={rider._id} className="hover:bg-primary/10 transition rounded-lg">
                                        <td className="text-secondary text-center px-2 sm:px-4">{i + 1}</td>
                                        <td className="text-secondary font-medium text-center px-2 sm:px-4">{rider.name}</td>
                                        <td className="text-secondary text-center px-2 sm:px-4">{rider.email}</td>
                                        <td className="text-center px-2 sm:px-4">
                                            <button
                                                onClick={() => handleAssignRider(rider)}
                                                className="btn bg-primary text-black border-none shadow-md hover:opacity-90 px-3 sm:px-4 py-1 sm:py-2 rounded-lg w-full sm:w-auto"
                                            >
                                                Assign
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Close Button */}
                    <div className="modal-action mt-4 sm:mt-6 justify-center">
                        <form method="dialog" className="w-full flex justify-center">
                            <button className="btn bg-secondary text-primary border-none hover:bg-secondary/90 px-6 py-2 rounded-lg w-full sm:w-auto">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AssignRiders;
