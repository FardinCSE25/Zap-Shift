import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './Social Login/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInUser } = UseAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || "/")
            })
            .then(error => {
                console.log(error);
            })

    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <title>Zap Shift-Login</title>
            <h1 className='text-4xl mt-5 font-bold ml-5'>
                Welcome back
            </h1>
            <h1 className='text-sm font-medium mt-2 ml-6'>
                Login with Zapshift
            </h1>
            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' &&
                        <p className='text-red-500'>Email must be filled.</p>
                    }
                    <label className="label">Password</label>
                    <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' &&
                        <p className='text-red-500'>Password is required.</p>
                    }
                    {
                        errors.password?.type === 'minLength' &&
                        <p className='text-red-500'>Password should be 6 characters.</p>
                    }
                    <div><a className="link link-hover text-secondary">Forgot password?</a></div>
                    <button className="btn bg-primary mt-4">Login</button>
                </fieldset>
                <p className=' text-[#71717A]'>
                    New to Zapshift?
                    <Link state={location.state} to="/register" className='text-primary font-semibold ml-1 hover:underline'>
                        Register
                    </Link>
                </p>
            </form>
            <SocialLogin />
        </div>
    );
};

export default Login;