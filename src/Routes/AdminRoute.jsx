import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../Components/Loading';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden';

const AdminRoute = ({children}) => {
    const { loading } = UseAuth()
    const { role, isLoading } = useRole()

    if (loading || isLoading) {
        return <Loading />
    }

    if (role !== 'admin') {
        return <Forbidden />
    }
    return children;
};

export default AdminRoute;