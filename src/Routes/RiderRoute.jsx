import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Components/Loading';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden';

const RiderRoute = ({ children }) => {
    const { loading } = UseAuth()
    const { role, isLoading } = useRole()

    if (loading || isLoading) {
        return <Loading />
    }

    if (role !== 'rider') {
        return <Forbidden />
    }
    return children;
};

export default RiderRoute;