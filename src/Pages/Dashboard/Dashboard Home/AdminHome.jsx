import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const pieColors = [
    "#CAEB66", // Primary
    "#03373D", // Secondary
    "#A3D39C", // Light green (Primary variation)
    "#056D70", // Dark teal (Secondary variation)
    "#E1F7C1", // Soft green accent
    "#66C9AC", // Cool teal accent
];

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/delivery-status/stats');
            return res.data;
        }
    });

    const chartData = deliveryStats
        .filter(item => item._id)
        .map((item, index) => ({
            name: item._id,
            value: item.count,
            color: pieColors[index % pieColors.length]
        }));

    return (
        <div className="p-6 md:p-10">

            {/* Header */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight mb-10 relative inline-block">
                Admin Dashboard
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full opacity-60"></span>
            </h2>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                {deliveryStats.map(stat => stat._id && (
                    <div
                        key={stat._id}
                        className="bg-white/70 backdrop-blur-lg shadow-xl p-6 rounded-xl border border-primary/20 hover:shadow-primary/40 transition duration-300"
                    >
                        <h3 className="text-lg font-semibold text-secondary capitalize">{stat._id}</h3>
                        <p className="text-5xl font-extrabold text-primary mt-3">{stat.count}</p>
                    </div>
                ))}
            </div>

            {/* Chart + Legend Section */}
            <div className="bg-white/60 backdrop-blur-2xl shadow-2xl p-10 rounded-2xl border border-primary/20 flex flex-col lg:flex-row gap-10 items-center justify-center">

                {/* Pie Chart */}
                <PieChart width={350} height={350}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={chartData}
                        cx="50%"
                        cy="90%"
                        outerRadius={140}
                        label={false}
                        isAnimationActive={true}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>

                {/* Custom Legend */}
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    {chartData.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl shadow bg-white/80 border border-gray-100 backdrop-blur"
                        >
                            <div
                                className="w-5 h-5 rounded-full shadow"
                                style={{ background: item.color }}
                            ></div>

                            <div className="text-lg font-semibold capitalize text-secondary">
                                {item.name}
                            </div>

                            <div className="ml-auto text-xl font-bold text-primary">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default AdminHome;
