import React from "react";
import { Helmet } from "react-helmet";
import { FaTruckFast, FaGlobe, FaWarehouse, FaMoneyBillWave, FaBuilding, FaRotateLeft } from "react-icons/fa6";

export default function Services() {
    const services = [
        {
            icon: <FaTruckFast className="text-4xl text-primary" />,
            title: "Express & Standard Delivery",
            desc: "We deliver parcels within 24–72 hours in major cities. Express delivery in Dhaka within 4–6 hours."
        },
        {
            icon: <FaGlobe className="text-4xl text-primary" />,
            title: "Nationwide Delivery",
            desc: "We deliver parcels nationwide with home delivery in every district within 48–72 hours."
        },
        {
            icon: <FaWarehouse className="text-4xl text-primary" />,
            title: "Fulfillment Solution",
            desc: "Customized service including inventory management, order processing, packaging & after-sales support."
        },
        {
            icon: <FaMoneyBillWave className="text-4xl text-primary" />,
            title: "Cash on Home Delivery",
            desc: "100% cash on delivery anywhere in Bangladesh with guaranteed product safety."
        },
        {
            icon: <FaBuilding className="text-4xl text-primary" />,
            title: "Corporate Service / Contract In Logistics",
            desc: "Customized corporate services including warehouse and inventory management support."
        },
        {
            icon: <FaRotateLeft className="text-4xl text-primary" />,
            title: "Parcel Return",
            desc: "Reverse logistics facility allowing customers to return or exchange products easily."
        },
    ];

    return (
        <section className="bg-secondary rounded-xl my-20 py-16 px-5">
            <Helmet>
                <title>Zap Shift - Services</title>
            </Helmet>
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-primary">Our Services</h2>
                <p className="text-gray-200 mt-2 max-w-2xl mx-auto">
                    Enjoy fast, reliable parcel delivery with real-time tracking and no hassle — for personal or business shipments.
                </p>
            </div>

            {/* Fully Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {services.map((item, i) => (
                    <div
                        key={i}
                        className="card bg-base-100 w-full shadow-md rounded-xl p-6 
                                   cursor-pointer transition-all duration-300
                                   hover:bg-primary group"
                    >
                        <div className="flex justify-center mb-4">
                            {React.cloneElement(item.icon, {
                                className: `${item.icon.props.className} group-hover:text-white transition-colors duration-300`
                            })}
                        </div>

                        <h3 className="text-xl font-semibold text-secondary text-center mb-3 group-hover:text-white transition">
                            {item.title}
                        </h3>

                        <p className="text-gray-600 text-center group-hover:text-white transition">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
