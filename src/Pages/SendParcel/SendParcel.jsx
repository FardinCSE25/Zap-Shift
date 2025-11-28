import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';

const SendParcel = () => {
    const { register, handleSubmit, control } = useForm();
    const { user } = UseAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regions = [...new Set(serviceCenters.map(center => center.region))];

    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });

    const districtsByRegion = (region) => {
        return serviceCenters
            .filter(center => center.region === region)
            .map(center => center.district);
    };

    const handleSendParcel = (data) => {
        const sameDistrict = data.senderDistrict === data.receiverDistrict;
        const isDocument = data.parcelType === 'Document';
        const weight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = sameDistrict ? 60 : 80;
        } else {
            if (weight <= 3) {
                cost = sameDistrict ? 110 : 150;
            } else {
                const minCharge = sameDistrict ? 110 : 150;
                const extraWeight = weight - 3;
                const extraCharge = sameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }

        data.cost = cost;

        Swal.fire({
            title: `Your cost: ${cost}`,
            text: "Confirm Payment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#FF0000",
            confirmButtonText: "<span style='color:black'>Yes</span>"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels');
                            Swal.fire({
                                title: "Done!",
                                text: "Your parcel has been created",
                                icon: "success",
                                timer: 2500,
                                showConfirmButton: false
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className='w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-8'>
            <h1 className='text-secondary text-4xl md:text-5xl font-extrabold mb-8 text-center'>Send Parcel</h1>
            <hr className='border-primary mb-8' />
            <form onSubmit={handleSubmit(handleSendParcel)} className="flex flex-col gap-8">

                {/* Parcel Type */}
                <div className='flex gap-6'>
                    <label className="label text-secondary">
                        <input type="radio" {...register('parcelType')} value="Document" className="radio radio-primary" defaultChecked />
                        Document
                    </label>
                    <label className="label text-secondary">
                        <input type="radio" {...register('parcelType')} value="Not-Document" className="radio radio-primary" />
                        Not-Document
                    </label>
                </div>

                {/* Parcel Details */}
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='flex-1'>
                        <label className='label text-secondary'>Parcel Name</label>
                        <input type="text" {...register('parcelName')} placeholder='Parcel Name' className='input w-full border-2 border-primary text-secondary' />
                    </div>
                    <div className='flex-1'>
                        <label className='label text-secondary'>Parcel Weight (KG)</label>
                        <input type="text" {...register('parcelWeight')} placeholder='Parcel Weight' className='input w-full border-2 border-primary text-secondary' />
                    </div>
                </div>

                <hr className='border-primary' />

                {/* Sender & Receiver Details */}
                <div className='flex flex-col md:flex-row gap-8 mt-6'>
                    {/* Sender */}
                    <fieldset className='flex-1'>
                        <legend className='text-2xl font-bold text-secondary mb-4'>Sender Details</legend>
                        <input type="text" {...register('SenderName')} defaultValue={user?.displayName} placeholder="Sender Name" className='input w-full border-2 border-primary text-secondary mb-3' />
                        <input type="email" {...register('SenderEmail')} defaultValue={user?.email} placeholder="Sender Email" className='input w-full border-2 border-primary text-secondary mb-3' />

                        <select {...register('senderRegion')} className='select w-full border-2 border-primary text-secondary mb-3'>
                            <option disabled>Pick a Region</option>
                            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                        </select>

                        <select {...register('senderDistrict')} className='select w-full border-2 border-primary text-secondary mb-3'>
                            <option disabled>Pick a District</option>
                            {districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                        </select>

                        <input type="text" {...register('SenderAddress')} placeholder="Sender Address" className='input w-full border-2 border-primary text-secondary mb-3' />
                        <input type="text" {...register('SenderContact')} placeholder="Sender Contact" className='input w-full border-2 border-primary text-secondary' />
                    </fieldset>

                    {/* Receiver */}
                    <fieldset className='flex-1'>
                        <legend className='text-2xl font-bold text-secondary mb-4'>Receiver Details</legend>
                        <input type="text" {...register('ReceiverName')} placeholder="Receiver Name" className='input w-full border-2 border-primary text-secondary mb-3' />
                        <input type="email" {...register('ReceiverEmail')} placeholder="Receiver Email" className='input w-full border-2 border-primary text-secondary mb-3' />

                        <select {...register('receiverRegion')} className='select w-full border-2 border-primary text-secondary mb-3'>
                            <option disabled>Pick a Region</option>
                            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                        </select>

                        <select {...register('receiverDistrict')} className='select w-full border-2 border-primary text-secondary mb-3'>
                            <option disabled>Pick a District</option>
                            {districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                        </select>

                        <input type="text" {...register('ReceiverAddress')} placeholder="Receiver Address" className='input w-full border-2 border-primary text-secondary mb-3' />
                        <input type="text" {...register('ReceiverContact')} placeholder="Receiver Contact" className='input w-full border-2 border-primary text-secondary' />
                    </fieldset>
                </div>

                <input type="submit" value="Send Parcel" className='btn bg-primary text-black w-44 h-12 self-center mt-6' />
            </form>
        </div>
    );
};

export default SendParcel;
