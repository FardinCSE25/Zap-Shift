import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './Social Login/SocialLogin';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${result.user.displayName || 'User'}!`,
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate(location?.state || "/");
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Incorrect email or password',
                });
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <title>Zap Shift -Login</title>
            <div className="card w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden">
                {/* Header */}
                <div className="bg-primary/10 p-8 text-center">
                    <h1 className='text-3xl sm:text-4xl font-bold text-secondary'>Welcome Back</h1>
                    <p className='text-gray-600 mt-2'>Login to your Zap Shift account</p>
                </div>

                {/* Form */}
                <form className="p-8 space-y-5" onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full rounded-xl border-gray-300 focus:border-primary focus:ring focus:ring-primary/30"
                            placeholder="Enter your email"
                        />
                        {errors.email?.type === 'required' &&
                            <p className='text-red-500 mt-1 text-sm'>Email must be filled.</p>
                        }
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input input-bordered w-full rounded-xl border-gray-300 focus:border-primary focus:ring focus:ring-primary/30"
                            placeholder="Enter your password"
                        />
                        {errors.password?.type === 'required' &&
                            <p className='text-red-500 mt-1 text-sm'>Password is required.</p>
                        }
                        {errors.password?.type === 'minLength' &&
                            <p className='text-red-500 mt-1 text-sm'>Password should be at least 6 characters.</p>
                        }
                    </div>

                    <div className="flex justify-end">
                        <a className="text-sm text-primary hover:underline">Forgot password?</a>
                    </div>

                    <button className="btn w-full bg-primary text-secondary rounded-xl hover:bg-primary/90 transition-all py-3 font-semibold">
                        Login
                    </button>

                    <p className='text-center text-gray-500 text-sm'>
                        New to Zap Shift?
                        <Link state={location.state} to="/register" className='text-primary font-semibold ml-1 hover:underline'>
                            Register
                        </Link>
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

export default Login;
