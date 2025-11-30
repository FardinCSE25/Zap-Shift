import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loading from '../../../Components/Loading';
import AdminHome from './AdminHome';
import RiderHome from './RiderHome';
import UserHome from './UserHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return <Loading />
    }

    if (role === 'admin') {
        return <AdminHome />
    }
    else if (role === 'rider') {
        return <RiderHome />
    }
    else {
        return <UserHome />
    }
};

export default DashboardHome;