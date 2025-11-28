import { useState } from "react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const tabs = ["Story", "Mission", "Success", "Team & Others"];

  const contentMap = {
    Story: `
  Zap Shift was born from a simple idea — to redefine parcel delivery in Bangladesh. 
  We noticed that sending and receiving parcels was often slow, unreliable, and stressful for both individuals and businesses. 
  Starting small, we focused on providing real-time tracking, punctual deliveries, and a customer-first approach. 
  Over the years, our dedication and innovative logistics solutions transformed us into a trusted partner for thousands of users nationwide. 
  From sending gifts to managing business shipments, our platform ensures every parcel reaches its destination safely and on time. 
  Our story is about passion, perseverance, and the relentless pursuit of excellence in the parcel delivery industry.
  `,

    Mission: `
  At Zap Shift, our mission is to empower Bangladesh with a modern, reliable, and transparent parcel delivery system. 
  We strive to make parcel management seamless for every user, whether it's an individual, small business, or a large enterprise. 
  By integrating technology, real-time tracking, automated pricing, OTP-based delivery verification, and nationwide coverage, 
  we aim to set new standards in logistics efficiency and customer satisfaction. 
  Our mission goes beyond delivery — we aim to build trust, reduce stress, and enhance convenience for everyone who uses our services.
  `,

    Success: `
  Since our inception, Zap Shift has successfully delivered over 500,000 parcels across 64 districts in Bangladesh, 
  maintaining a remarkable 98% on-time delivery rate. 
  We have empowered businesses to streamline their logistics, reduced operational delays, and provided individuals with 
  transparent and reliable delivery experiences. 
  Our customers enjoy features like real-time parcel tracking, secure OTP-based handoffs, automated cost calculation, 
  and dedicated support for every query. 
  Zap Shift's success is driven by technology, operational excellence, and an unwavering commitment to customer satisfaction.
  `,

    "Team & Others": `
  Our team is the heart of Zap Shift. It consists of experienced logistics professionals, software developers, 
  customer service experts, and warehouse managers. 
  We have a dedicated network of riders covering 64 districts, ensuring fast, secure, and reliable delivery. 
  Warehouse staff and regional managers work behind the scenes to coordinate routes, manage inventory, and maintain operational efficiency. 
  We also collaborate with local partners, vendors, and communities to continuously expand our reach and improve service quality. 
  Together, our team ensures that every parcel — whether small or large, local or long-distance — 
  is delivered efficiently, safely, and with care. Our culture emphasizes accountability, innovation, and teamwork, 
  making Zap Shift a trusted and forward-thinking logistics company in Bangladesh.
  `
  };


  return (
    <section className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-md px-[109px] py-20 mt-8 mb-20">
      <title>Zap Shift - About Us</title>

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
            className={`text-lg font-bold pb-2 transition-all ${activeTab === tab
              ? "text-[#5B6A2E] border-b-4 border-primary"
              : "text-gray-400 hover:text-black"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 space-y-6 text-gray-500 leading-relaxed">
        <p>{contentMap[activeTab]}</p>
      </div>
    </section>
  );
};

export default AboutSection;
