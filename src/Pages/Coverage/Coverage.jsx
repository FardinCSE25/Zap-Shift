import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData();
    const mapRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.search.value;
        const district = serviceCenters.find(center =>
            center.district.toLowerCase().includes(location.toLowerCase())
        );
        if (district) {
            const found = [district.latitude, district.longitude];
            mapRef.current.flyTo(found, 12);
        }
    };

    return (
        <div className="bg-white rounded-[80px] mb-28 mt-10 px-[100px] py-20 shadow-xl border border-secondary/20">
            <title>Zap Shift - Coverage</title>

            {/* Page Title */}
            <h3 className="text-5xl font-extrabold text-secondary mb-4">
                Nationwide Coverage
            </h3>
            <p className="text-gray-600 text-lg mb-12">
                We are available across <span className="text-primary font-semibold mr-1">all 64 districts</span>
                of Bangladesh—offering fast, secure, and reliable delivery everywhere.
            </p>

            {/* Search Section */}
            <div className="max-w-xl">
                <form onSubmit={handleSearch} className="flex">
                    <div className="relative w-full">

                        {/* Search icon */}
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="h-[1.3em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round"
                                    strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                        </span>

                        {/* Input */}
                        <input
                            type="search"
                            name="search"
                            placeholder="Search district..."
                            className="w-full pl-14 pr-36 py-4 rounded-[20px] border border-secondary/30 
                                       focus:border-primary focus:ring-2 focus:ring-primary/40 outline-none 
                                       text-black shadow-sm transition-all"
                        />

                        {/* Button */}
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 
                                       bg-primary text-black font-semibold rounded-[15px] 
                                       px-6 py-3 hover:bg-primary/90 transition"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {/* Map */}
            <div className="h-[720px] mt-12 overflow-hidden rounded-[40px] border border-secondary/30 shadow-lg">
                <MapContainer
                    ref={mapRef}
                    center={position}
                    zoom={7.5}
                    scrollWheelZoom={false}
                    className="h-full w-full rounded-[40px]"
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {serviceCenters.map((center, index) => (
                        <Marker key={index} position={[center.latitude, center.longitude]}>
                            <Popup>
                                <p className="font-extrabold mb-1 text-secondary">
                                    {center.district}
                                </p>
                                <span className="text-sm text-gray-700">
                                    <b>Service Areas:</b> {center.covered_area.join(", ")}
                                </span>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
