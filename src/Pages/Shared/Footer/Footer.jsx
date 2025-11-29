import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { FaFacebook, FaYoutube, FaFacebookMessenger } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-secondary text-primary rounded-[30px] mt-16 px-8 py-14">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">

                {/* Brand / Logo */}
                <div>
                    <Logo />
                    <p className="font-bold text-lg mt-3">Zap Shift Resources</p>
                    <p className="text-sm mt-1">
                        A curated collection of tools, guides & assets for robust parcel management systems.
                    </p>
                    <p className="text-xs mt-4 opacity-70">
                        © {new Date().getFullYear()} Zap Shift — All rights reserved.
                    </p>
                </div>

                {/* System Overview */}
                <div>
                    <h3 className="font-bold text-lg mb-3">System Overview</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>📦 User — Book, Pay, Track Parcels</li>
                        <li>🛠 Admin — Manage Routing & Operations</li>
                        <li>🚚 Riders — Deliver & Update Status</li>
                        <li>🔐 OTP-secure Delivery</li>
                        <li>🌍 Nationwide Coverage (64 Districts)</li>
                    </ul>
                </div>

                {/* Pricing Summary & Social Links */}
                <div>
                    <h3 className="font-bold text-lg mb-3">Pricing Summary</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>📄 Document: ৳60 (City) • ৳80 (Outside)</li>
                        <li>📦 Parcels ≤3kg: ৳110 (City) • ৳150 (Outside)</li>
                        <li>📦 {'>'}3kg: +৳40 per kg</li>
                        <li>💸 Rider Commission: 80% (City), 60% (Outside)</li>
                    </ul>

                    <div className="flex justify-center md:justify-start gap-5 mt-5 text-primary">
                        <FaFacebook size={26} className="cursor-pointer hover:text-white duration-200" />
                        <FaYoutube size={26} className="cursor-pointer hover:text-white duration-200" />
                        <FaFacebookMessenger size={26} className="cursor-pointer hover:text-white duration-200" />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
