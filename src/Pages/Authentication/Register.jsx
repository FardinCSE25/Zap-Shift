import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './Social Login/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegister = (data) => {
        const profilePhoto = data.photo[0];
        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profilePhoto);
                const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost}`;

                axios.post(photo_API_URL, formData)
                    .then(result => {
                        const photoURL = result.data.data.url;

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Registration Successful',
                                        text: `Welcome ${data.name}!`,
                                        timer: 2000,
                                        showConfirmButton: false
                                    });
                                }
                            });

                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        };

                        updateUserProfile(userProfile)
                            .then(() => navigate(location.state || '/'))
                            .catch(err => console.log(err));
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Image Upload Failed',
                            text: 'Could not upload profile photo',
                        });
                    });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Please try again',
                });
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 ">
            <div className="card w-full max-w-md sm:max-w-lg bg-white shadow-2xl my-10 rounded-3xl overflow-hidden">
                <title>Zap Shift -Register</title>
                {/* Header */}
                <div className="bg-primary/10 p-8 text-center">
                    <h1 className='text-3xl sm:text-4xl font-bold text-secondary'>Create an Account</h1>
                    <p className='text-gray-600 mt-2'>Register with Zap Shift</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleRegister)} className='p-8 space-y-5'>

                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input input-bordered w-full rounded-xl border-gray-300 focus:border-primary focus:ring focus:ring-primary/30" placeholder="Your Name" />
                        {errors.name && <p className='text-red-500 mt-1 text-sm'>Name is required.</p>}
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Photo</label>
                        <input type="file" {...register('photo', { required: true })} className="file-input w-full" />
                        {errors.photo && <p className='text-red-500 mt-1 text-sm'>Photo is required.</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input input-bordered w-full rounded-xl border-gray-300 focus:border-primary focus:ring focus:ring-primary/30" placeholder="Email" />
                        {errors.email && <p className='text-red-500 mt-1 text-sm'>Email is required.</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                        })} className="input input-bordered w-full rounded-xl border-gray-300 focus:border-primary focus:ring focus:ring-primary/30" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className='text-red-500 mt-1 text-sm'>Password is required.</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500 mt-1 text-sm'>Password should be at least 6 characters.</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-500 mt-1 text-sm'>Password must include uppercase, lowercase, number & special character.</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className='flex justify-end'>
                        <a className="text-sm text-primary hover:underline">Forgot password?</a>
                    </div>

                    {/* Submit */}
                    <button className="btn w-full bg-primary text-secondary hover:bg-primary/90 transition-all py-3 font-semibold rounded-xl">Register</button>

                    {/* Login Link */}
                    <p className='text-center text-gray-500 text-sm'>
                        Already have an account?
                        <Link state={location.state} to="/login" className='text-primary font-semibold ml-1 hover:underline'>Login</Link>
                    </p>
                </form>

                {/* Social Login */}
                <div className="p-8 border-t border-gray-200">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;
