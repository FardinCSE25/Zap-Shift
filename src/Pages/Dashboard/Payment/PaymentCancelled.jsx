import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-2xl mt-10 text-secondary text-center'>
                Payment Cancelled!!
            </h2>
            <div className='flex justify-center'>
                <Link to="/dashboard/my-parcels">
                <button className='mt-5 btn btn-primary text-black'>Try Again</button></Link>
            </div>
        </div>
    );
};

export default PaymentCancelled;