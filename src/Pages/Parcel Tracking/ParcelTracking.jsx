import React from 'react';
import { useParams } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading';

const ParcelTracking = () => {
    const { id } = useParams();
    const axiosInstance = UseAxios();

    const { data: trackings = [], isLoading } = useQuery({
        queryKey: ['tracking', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${id}/logs`);
            return res.data;
        },
    });

    const capitalizeWords = (str) => {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const formatDate = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateStr).toLocaleString(undefined, options);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6 md:p-10 flex justify-center">
            <title>Zap Shift - Parcel Tracking</title>
            {/* Outer card */}
            <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 w-full max-w-4xl border border-secondary/20">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight mb-2 relative inline-block">
                        Track your package
                        <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full opacity-70"></span>
                    </h2>
                    <h3 className="text-xl md:text-2xl font-semibold text-primary mt-2">
                        Parcel ID: <span className="font-mono">{id}</span>
                    </h3>
                    <p className="text-secondary/70 mt-3 text-sm md:text-base">
                        Below are all tracking logs for your parcel.
                    </p>
                </div>

                {/* Timeline */}
                <ul className="timeline timeline-vertical">
                    {trackings.map((log) => (
                        <li key={log._id}>
                            <div className="timeline-start timeline-box bg-secondary/10 shadow-md p-4 rounded-md">
                                <span className="font-semibold text-secondary">{capitalizeWords(log.details)}</span>
                                <p className="text-sm text-secondary/70 mt-1">{formatDate(log.createdAt)}</p>
                            </div>

                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="text-primary h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <hr className="bg-primary" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ParcelTracking;
