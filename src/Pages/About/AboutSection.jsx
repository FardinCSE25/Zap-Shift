import { useState } from "react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const tabs = ["Story", "Mission", "Success", "Team & Others"];

  const contentText = `
    We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. 
    Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service 
    has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business 
    delivery, we ensure it reaches its destination — on time, every time.
  `;

  return (
    <section className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-md px-[109px] py-20 mt-8 mb-20">
      {/* Title */}
      <h2 className="text-5xl font-bold text-secondary mb-4">About Us</h2>

      {/* Subtitle */}
      <p className="text-gray-600 mb-12 max-w-2xl">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.  
        From personal packages to business shipments — we deliver on time, every time.
      </p>

      {/* Tabs */}
      <div className="flex gap-8 border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-lg font-bold pb-8 transition-all ${
              activeTab === tab
                ? "text-[#5B6A2E]"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 space-y-6 text-gray-500 leading-relaxed">
        <p>{contentText}</p>
        <p>{contentText}</p>
        <p>{contentText}</p>
      </div>
    </section>
  );
};

export default AboutSection;
