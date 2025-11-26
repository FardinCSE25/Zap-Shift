import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './Social Login/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile } = UseAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const handleRegister = (data) => {
        const profilePhoto = data.photo[0]
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result)
                const formData = new FormData();
                formData.append('image', profilePhoto)
                const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost}`

                axios.post(photo_API_URL, formData)
                    .then(result => {
                        const photoURL = result.data.data.url
                        console.log(result.data);

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                        .then(res=>{
                            if(res.data.insertedId){
                                console.log('user created successful');
                            }
                        })

                        const userProfile = {
                            displayName: data.name,
                            photoURL: result.data.data.url
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log("Done!");
                                navigate(location.state || '/')
                            })
                            .catch(error => {
                                console.log(error);

                            })
                    })
            })
            .catch(error => {
                console.log(error);

            })

    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <title>Zap Shift-Register</title>
            <h1 className='text-4xl mt-5 font-bold ml-5'>
                Create an Account
            </h1>
            <h1 className='text-sm font-medium mt-2 ml-6'>
                Register with Zapshift
            </h1>
            <form onSubmit={handleSubmit(handleRegister)} className='card-body'>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>}

                    {/* photo image field */}
                    <label className="label">Photo</label>

                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />

                    {errors.photo?.type === 'required' && <p className='text-red-500'>PhotoURL is required.</p>}

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' &&
                        <p className='text-red-500'>Email must be filled.</p>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' &&
                        <p className='text-red-500'>Password is required.</p>
                    }
                    {
                        errors.password?.type === 'minLength' &&
                        <p className='text-red-500'>Password should be 6 characters.</p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                    }
                    <div><a className="link link-hover text-secondary">Forgot password?</a></div>
                    <button className="btn bg-primary mt-4">Register</button>
                </fieldset>
                <p className=' text-[#71717A]'>
                    Already have an account?
                    <Link state={location.state} to="/login" className='text-primary font-semibold ml-1 hover:underline'>
                        login
                    </Link>
                </p>
            </form>
            <SocialLogin />
        </div>
    );
};

export default Register;