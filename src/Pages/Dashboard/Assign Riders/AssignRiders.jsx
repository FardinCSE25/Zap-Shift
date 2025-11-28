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

    const { data: riders = [] } = useQuery({
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
            parcelId: selectedParcel._id
        };
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close();
                    parcelsRefetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has been assigned.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

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
                                <td className="text-secondary">{parcel.created_at}</td>
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
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white rounded-xl shadow-xl">
                    <h3 className="font-bold text-lg text-secondary">Riders Available: {riders.length}</h3>

                    <div className="overflow-x-auto mt-4">
                        <table className="table w-full">
                            <thead className="bg-secondary/10 text-secondary">
                                <tr>
                                    <th>Sl No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.map((rider, i) => (
                                    <tr key={rider._id} className="hover:bg-primary/10 transition">
                                        <th className="text-secondary">{i + 1}</th>
                                        <td className="text-secondary font-medium">{rider.name}</td>
                                        <td className="text-secondary">{rider.email}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAssignRider(rider)}
                                                className='btn bg-primary text-secondary border-none shadow-md hover:opacity-80'
                                            >
                                                Assign
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn bg-secondary text-primary border-none hover:opacity-80">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;
