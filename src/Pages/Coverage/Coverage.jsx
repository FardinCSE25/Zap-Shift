import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const position = [23.6850, 90.3563]
    const serviceCenters = useLoaderData()
    console.log(serviceCenters);
    const mapRef = useRef(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.search.value;
        const district = serviceCenters.find(center => center.district.toLowerCase().includes(location.toLowerCase()))
        if (district) {
            const found = [district.latitude, district.longitude]
            mapRef.current.flyTo(found, 15)
        }
    }

    return (
        <div className='bg-white rounded-[80px] mb-32 mt-8 px-[109px] py-20'>
            <h3 className='text-5xl font-extrabold text-secondary mb-10'>
                We are available in 64 districts
            </h3>
            <div >
                <form onSubmit={handleSearch} className="w-full flex">
                    <div className="relative w-[500px] mb-10">

                        {/* Search Icon */}
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="h-[1.3em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                        </span>

                        {/* Input Field */}
                        <input
                            type="search"
                            name="search"
                            placeholder="Search..."
                            className="w-full pl-14 pr-32 py-4 rounded-[20px] border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none text-black shadow-sm"
                        />

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-black font-semibold rounded-[15px] px-6 py-3 hover:bg-primary/90 transition"
                        >
                            Search
                        </button>

                    </div>
                </form>

            </div>
            <div className='h-[800px]'>
                <MapContainer ref={mapRef} center={position} zoom={7.5} scrollWheelZoom={false} className='h-[800px]'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenters.map((center, index) => {
                            return (
                                <Marker key={index} position={[center.latitude, center.longitude]}>
                                    <Popup>
                                        <p className='font-extrabold mb-1'>{center.district}</p> <br /> <span>Service Areas : {center.covered_area.join(", ")}</span>
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;