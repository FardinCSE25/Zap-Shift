import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading';

const Payment = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`)
            return res.data
        }
    })

    const handlePayment = async () => {
        const paymentInfo = {
            parcelId: parcel._id,
            parcelName: parcel.parcelName,
            cost: parcel.cost,
            SenderEmail: parcel.SenderEmail
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data);
        
        window.location.href = res.data.url
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h2>
                Please Pay ${parcel.cost}TK for : {parcel.parcelName}
            </h2>
            <button onClick={handlePayment} className='btn bg-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;