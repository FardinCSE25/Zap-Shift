import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';

const SendParcel = () => {
    const { register, handleSubmit, control,
        // formState: { errors }
    } = useForm()
    const { user } = UseAuth();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const serviceCenters = useLoaderData()
    const duplicateRegions = serviceCenters.map(center => center.region)
    const regionsSet = new Set(duplicateRegions)
    const regions = [...regionsSet]

    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })
    // console.log(regions);

    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(center => center.region === region)
        const districts = regionDistricts.map(districts => districts.district)
        return districts
    }

    const handleSendParcel = (data) => {
        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        const isDocument = data.parcelType === 'Document'
        const weight = parseFloat(data.parcelWeight)
        // console.log(sameDistrict);

        let cost = 0
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80
        }
        else {
            if (weight <= 3) {
                cost = isSameDistrict ? 110 : 150
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150
                const extraWeight = weight - 3
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minCharge + extraCharge
            }
        }
        console.log(cost);
        data.cost = cost
        Swal.fire({
            title: `Your cost will be : ${cost}`,
            text: "Confirm Payment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#CAEB66",
            cancelButtonColor: "#FF0000",
            confirmButtonText: "<span style='width:50px; color:black; display:block;'>Yes</span>"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('after saving parcel', res.data);
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                title: "Done!",
                                text: "Your payment has been created",
                                icon: "success",
                                position: 'center',
                                timer: 2500
                            });
                        }
                    })
            }
        });

    }
    return (
        <div className='bg-white rounded-[30px] px-[109px] py-20 mt-8 mb-80'>
            <title>Zap Shift-Send Parcel</title>
            <h1 className='text-secondary text-5xl font-extrabold mb-12'>Send Parcel</h1>
            <hr className='w-full text-primary' />
            <h2 className='my-7 text-3xl text-secondary font-extrabold'>
                Enter Your Parcel Details
            </h2>
            <form onSubmit={handleSubmit(handleSendParcel)}>
                <div className=''>
                    <label className="label text-secondary mr-4">
                        <input type="radio" {...register('parcelType')} value="Document" className="radio text-primary" defaultChecked />
                        Document</label>
                    <label className="label text-secondary">
                        <input type="radio" {...register('parcelType')} value="Not-Document" className="radio text-primary" />
                        Not-Document</label>
                </div>

                <div className="flex-col flex gap-12 mt-3 mb-12 md:flex-row">
                    <fieldset className="fieldset flex-1">
                        <label className="label text-lg text-secondary">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full border-2 border-primary text-secondary" placeholder="Parcel Name" />

                    </fieldset>
                    <fieldset className="fieldset flex-1">
                        <label className="label text-lg text-secondary">Parcel Weight (KG)</label>
                        <input type="text" {...register('parcelWeight')} className="input w-full border-2 border-primary text-secondary" placeholder="Parcel Weight (KG)" />
                    </fieldset>
                </div>
                <hr className='w-full text-primary' />
                <div className='mt-11 flex-col flex gap-12 md:flex-row'>

                    <fieldset className="fieldset flex-1">
                        <h3 className='text-2xl text-secondary mb-6 font-bold'>
                            Sender Details
                        </h3>
                        <label className="label text-lg text-secondary">Sender Name</label>
                        <input type="text" defaultValue={user?.displayName} {...register('SenderName')} className="input w-full border-2 border-primary text-secondary" placeholder="Sender Name" />

                        <label className="label text-lg text-secondary">Sender Email</label>
                        <input type="email" defaultValue={user?.email} {...register('SenderEmail')} className="input w-full border-2 border-primary text-secondary" placeholder="Sender Email" />

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-normal text-lg text-secondary">Sender Region</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a Region" className="select w-full border-2 border-primary text-secondary">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((region, index) => <option key={index} value={region}>{region}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-normal text-lg text-secondary">Sender District</legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a District" className="select w-full border-2 border-primary text-secondary">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtsByRegion(senderRegion).map((district, index) => <option key={index} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>

                        <label className="label text-lg text-secondary mt-4">Sender Address</label>
                        <input type="text" {...register('SenderAddress')} className="input w-full border-2 border-primary text-secondary" placeholder="Sender Address" />

                        <label className="label text-lg text-secondary mt-4">Sender Contact No</label>
                        <input type="text" {...register('SenderContact')} className="input w-full border-2 border-primary text-secondary" placeholder="Sender Contact No" />
                    </fieldset>


                    <fieldset className="fieldset flex-1">
                        <h3 className='text-2xl text-secondary mb-6 font-bold'>
                            Receiver Details
                        </h3>
                        <label className="label text-lg text-secondary">Receiver Name</label>
                        <input type="text" {...register('ReceiverName')} className="input w-full border-2 border-primary text-secondary" placeholder="Receiver Name" />

                        <label className="label text-lg text-secondary">Receiver Email</label>
                        <input type="email" {...register('ReceiverEmail')} className="input w-full border-2 border-primary text-secondary" placeholder="Receiver Email" />

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-normal text-lg text-secondary">Receiver Region</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select w-full border-2 border-primary text-secondary">
                                <option disabled={true}>Pick a Region</option>
                                {
                                    regions.map((region, index) => <option key={index} value={region}>{region}</option>)
                                }
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend font-normal text-lg text-secondary">Receiver District</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select w-full border-2 border-primary text-secondary">
                                <option disabled={true}>Pick a District</option>
                                {
                                    districtsByRegion(receiverRegion).map((district, index) => <option key={index} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>

                        <label className="label text-lg text-secondary mt-4">Receiver Address</label>
                        <input type="text" {...register('ReceiverAddress')} className="input w-full border-2 border-primary text-secondary" placeholder="Receiver Address" />

                        <label className="label text-lg text-secondary mt-4">Receiver Contact No</label>
                        <input type="text" {...register('ReceiverContact')} className="input w-full border-2 border-primary text-secondary" placeholder="Receiver Contact No" />

                    </fieldset>

                </div>
                <input type="submit" className='btn bg-primary w-[300px] h-[45px] text-black mt-10' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;