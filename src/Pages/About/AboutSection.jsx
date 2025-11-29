import { useState } from "react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const tabs = ["Story", "Mission", "Success", "Team & Others"];

  const contentMap = {
    Story: `
Zap Shift was born from a simple idea — to redefine parcel delivery in Bangladesh.
We realized that sending and receiving parcels was often slow, unreliable, and stressful.
Starting small, we focused on real-time tracking, punctual delivery, and customer-first service.
Over the years, our dedication transformed Zap Shift into a trusted logistics partner nationwide.
Our journey is rooted in passion, innovation, and the drive to make delivery smarter and faster.
    `,

    Mission: `
Our mission is to build a modern, reliable, and transparent parcel delivery ecosystem in Bangladesh.
We aim to simplify logistics for individuals and businesses through automation, real-time tracking,
OTP-based secure delivery, and nationwide coverage. We don’t just deliver parcels — we deliver trust,
convenience, and peace of mind.
    `,

    Success: `
Zap Shift has completed over 500,000 successful deliveries with a 98% on-time success rate.
We helped businesses streamline logistics and ensured stress-free delivery experiences for individuals.
Our core achievements include real-time tracking, automated cost calculation, and OTP-secured handoff.
Our growth is powered by technology, innovation, and customer satisfaction.
    `,

    "Team & Others": `
Our team is the backbone of Zap Shift — logistics experts, developers, support specialists, and managers.
With a strong network of riders across all 64 districts, we ensure fast, secure delivery everywhere.
Warehouse teams coordinate routing, safety, and operations behind the scenes.
Together, we maintain a culture of accountability, innovation, and excellence in nationwide logistics.
    `
  };

  return (
    <section className="max-w-[1600px] mx-auto mt-10 mb-24">

      {/* Header Section */}
      <div className="rounded-[40px] bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/10 p-16 shadow-xl">
        <h2 className="text-6xl font-extrabold text-secondary drop-shadow-sm">
          About Zap Shift
        </h2>
        <p className="text-gray-700 text-xl mt-4 max-w-3xl">
          Fast, reliable parcel delivery powered by modern logistics — serving individuals,
          businesses, and everyone in between.
        </p>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-[40px] shadow-lg px-[100px] py-16 mt-10 border border-secondary/20">

        {/* Tabs */}
        <div className="flex gap-10 border-b border-secondary/20 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative text-xl font-semibold pb-3 transition-all 
                ${activeTab === tab
                  ? "text-secondary"
                  : "text-gray-400 hover:text-black"
                }`}
            >
              {tab}

              {/* Active Indicator Bar */}
              {activeTab === tab && (
                <span className="absolute left-0 right-0 -bottom-[2px] mx-auto w-full h-[4px] bg-primary rounded-full shadow-md transition-all"></span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-10 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-inner">
          <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line animate-fadeIn">
            {contentMap[activeTab]}
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
