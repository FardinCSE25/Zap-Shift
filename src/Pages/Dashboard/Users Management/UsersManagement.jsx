import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        },
    });

    // --- admin functions ---
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "admin" })
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.displayName} is now an Admin`,
                        timer: 1800,
                        showConfirmButton: false,
                    });
                }
            });
    };

    const handleRemoveAdmin = (user) => {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "user" })
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.displayName} removed from admin`,
                        timer: 1800,
                        showConfirmButton: false,
                    });
                }
            });
    };

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

            <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-8">
                Manage Users <span className="text-primary ml-2">({users.length})</span>
            </h2>

            {/* Search Box */}
            <div className="flex justify-center mb-6">
                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md w-full md:w-1/2">
                    <svg
                        className="h-6 opacity-60"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        placeholder="Search by name or email"
                        className="w-full bg-transparent outline-none text-secondary placeholder-secondary"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-primary/10 transition">
                                <th className="text-secondary">{index + 1}</th>

                                {/* User details */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="User"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-secondary">{user.displayName}</div>
                                            <div className="text-sm opacity-50 text-secondary">Registered User</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-secondary">{user.email}</td>
                                <td className="font-semibold text-secondary">{user.role}</td>

                                {/* Admin Action Button */}
                                <td>
                                    {user.role === "admin" ? (
                                        <button
                                            onClick={() => handleRemoveAdmin(user)}
                                            className="btn bg-red-500 text-white hover:bg-red-600"
                                        >
                                            <FiShieldOff size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn bg-primary text-secondary border-none shadow-md hover:opacity-80"
                                        >
                                            <FaUserShield size={18} />
                                        </button>
                                    )}
                                </td>

                                {/* Other actions */}
                                <td>
                                    <button className="btn btn-ghost hover:bg-primary hover:text-secondary">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;
