import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    return (
        <div className='w-11/12 mx-auto my-20 bg-base-200 rounded-[20px]'>
            <title>Zap Shift-Payment History</title>
            <h1 className='text-center text-3xl text-secondary py-8'>
                Payment History : {payments.length}
            </h1>
            <div className="overflow-x-auto ml-16">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Parcel Name</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                            <th>Transaction ID</th>
                            <th>Tracking ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment) => <tr key={payment._id}>
                                <td>{payment.parcelName}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.paidAt}</td>
                                {/* <td>
                                    {
                                        payment.paymentStatus === 'paid' ?
                                            <span className='text-secondary'>Paid</span> :
                                            <Link to={`/dashboard/payment/${payment._id}`}>
                                                <button className='btn bg-primary text-black'>
                                                    Pay
                                                </button>
                                            </Link>
                                    }
                                </td> */}
                                <td>{payment.transactionId}</td>
                                <td>{payment.trackingId}</td>
                                {/* <td>
                                    <button className="btn btn-square hover:bg-primary">
                                        <FaMagnifyingGlass />
                                    </button>
                                    <button className="btn btn-square hover:bg-primary mx-2">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handlepaymentDelete(payment._id)} className="btn btn-square hover:bg-primary">
                                        <FaTrash />
                                    </button>
                                </td> */}
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;