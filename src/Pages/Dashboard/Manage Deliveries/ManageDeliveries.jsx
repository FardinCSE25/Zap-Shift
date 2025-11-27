import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageDeliveries = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user?.email, 'rider-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(``)
            return res.data
        }
    })
    return (
        <div>

        </div>
    );
};

export default ManageDeliveries;