import React from 'react';
import UseAuth from './UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const { isLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res.data.role
        }
    })
    return { isLoading, role };
};

export default useRole;