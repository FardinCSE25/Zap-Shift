import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';

const BeRider = () => {
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors } 
    } = useForm();
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);

    const regions = [...new Set(regionsDuplicate)];
    // explore useMemo useCallback
    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const riderRegion = useWatch({ control, name: 'region' });

    const handleRiderApplication = data => {
        console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your application has been submitted.",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    return (
        <div>
            <title>Zap Shift-Be a Rider</title>
            <h2 className="text-4xl text-secondary ml-60 mt-10">Be a Rider</h2>
            <form onSubmit={handleSubmit(handleRiderApplication)} className='mt-12 p-4 text-black'>

                {/* two column */}
                <div className='w-[1000px] mx-auto'>
                    {/* rider Details */}

                    <fieldset className="fieldset">
                        <h4 className="text-2xl text-secondary font-semibold">Rider Details</h4>
                        {/* rider name */}
                        <label className="label text-secondary">Rider Name</label>
                        <input type="text" {...register('name')}
                            defaultValue={user?.displayName}
                            className="input w-full" placeholder="Sender Name" />

                        {/* rider email */}
                        <label className="label text-secondary">Email</label>
                        <input type="text" {...register('email')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Sender Email" />

                        {/* rider region */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-secondary">Regions</legend>
                            <select {...register('region')} defaultValue="Pick a region" className="select w-full text-secondary">
                                <option disabled={true}>Pick a region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>

                        {/* rider districts */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-secondary">Districts</legend>
                            <select {...register('district')} defaultValue="Pick a district" className="select w-full text-secondary">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtsByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                }
                            </select>
                        </fieldset>


                        {/* rider address */}
                        <label className="label mt-4 text-secondary">Your Address</label>
                        <input type="text" {...register('address')} className="input w-full" placeholder="Your Address" />


                    </fieldset>
                    {/* receiver Details */}
                    <fieldset className="fieldset mt-3">
                        {/* receiver name */}
                        <label className="label text-secondary">Driving License</label>
                        <input type="text" {...register('license')} className="input w-full" placeholder="Driving License" />

                        {/* receiver email */}
                        <label className="label text-secondary">NID</label>
                        <input type="text" {...register('nid')} className="input w-full" placeholder="Your NID no" />


                        {/* Bike */}
                        <label className="label mt-4 text-secondary">Bike</label>
                        <input type="text" {...register('bike')} className="input w-full" placeholder="Bike" />
                        {/*  address */}


                    </fieldset>
                    <input type="submit" className='btn bg-primary mt-8 mb-10 text-black' value="Apply" />
                </div>
                
            </form>
        </div>
    );
};

export default BeRider;