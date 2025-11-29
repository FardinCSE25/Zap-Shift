import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';

const BeRider = () => {
    const { register, handleSubmit, control } = useForm();
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData();
    const regions = [...new Set(serviceCenters.map(c => c.region))];

    const riderRegion = useWatch({ control, name: 'region' });

    const districtsByRegion = (region) => {
        return serviceCenters
            .filter(c => c.region === region)
            .map(c => c.district);
    };

    const handleRiderApplication = (data) => {
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
            });
    };

    return (
        <div className="w-11/12 md:w-3/4 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-8">
            <title>Zap Shift - Be a Rider</title>
            <h2 className="text-4xl text-secondary font-bold text-center mb-8">Be a Rider</h2>

            <form onSubmit={handleSubmit(handleRiderApplication)} className="flex flex-col gap-8">

                {/* Rider Details */}
                <fieldset className="flex flex-col gap-4">
                    <legend className="text-2xl font-semibold text-secondary">Rider Details</legend>

                    <input
                        type="text"
                        {...register('name')}
                        defaultValue={user?.displayName}
                        placeholder="Rider Name"
                        className="input w-full border-2 border-primary text-secondary"
                    />

                    <input
                        type="email"
                        {...register('email')}
                        defaultValue={user?.email}
                        placeholder="Email"
                        className="input w-full border-2 border-primary text-secondary"
                    />

                    {/* Region */}
                    <select {...register('region')} className="select w-full border-2 border-primary text-secondary mb-3" defaultValue="">
                        <option value="" disabled>Pick a Region</option>
                        {regions.map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                        ))}
                    </select>

                    {/* District */}
                    <select {...register('district')} className="select w-full border-2 border-primary text-secondary mb-3" defaultValue="">
                        <option value="" disabled>Pick a District</option>
                        {districtsByRegion(riderRegion).map((d, i) => (
                            <option key={i} value={d}>{d}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        {...register('address')}
                        placeholder="Your Address"
                        className="input w-full border-2 border-primary text-secondary"
                    />
                </fieldset>

                {/* License & Bike Details */}
                <fieldset className="flex flex-col gap-4">
                    <legend className="text-2xl font-semibold text-secondary">Documents & Bike</legend>

                    <input
                        type="text"
                        {...register('license')}
                        placeholder="Driving License"
                        className="input w-full border-2 border-primary text-secondary"
                    />

                    <input
                        type="text"
                        {...register('nid')}
                        placeholder="NID Number"
                        className="input w-full border-2 border-primary text-secondary"
                    />

                    <input
                        type="text"
                        {...register('bike')}
                        placeholder="Bike Model"
                        className="input w-full border-2 border-primary text-secondary"
                    />
                </fieldset>

                <input
                    type="submit"
                    value="Apply"
                    className="btn bg-primary text-black w-44 h-12 self-center mt-4"
                />

            </form>
        </div>
    );
};

export default BeRider;
