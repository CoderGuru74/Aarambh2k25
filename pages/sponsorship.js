import React from "react";

export default function SponsorshipPage() {
  return (
    <section id="sponsors" className="bg-dark-bg py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold font-heading text-center mb-16 bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent
                      pb-4 border-b-2 border-neon-cyan/50 relative z-10 text-shadow-subtle-neon will-change-transform-opacity">
          Our Esteemed Sponsors
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full"></span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          <div className="flex justify-center items-center p-4">
            <img
              src="/sponsors/Audi-Logo-Desktop-Wallpapers-Photo.jpg"
              alt="Audi Sponsor"
              className="max-h-28 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
            />
          </div>
          <div className="flex justify-center items-center p-4">
            <img
              src="/sponsors/alex-albon-red-bull-racing-rb1.jpg"
              alt="Red Bull Racing Sponsor 1"
              className="max-h-28 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
            />
          </div>
          <div className="flex justify-center items-center p-4">
            <img
              src="/sponsors/News_RedBullT822Renewal2-1024x576.jpg"
              alt="Red Bull Sponsor 2"
              className="max-h-28 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
            />
          </div>
          <div className="flex justify-center items-center p-4">
            <img
              src="/sponsors/Nike-Logo-1978-present.jpg"
              alt="Nike Sponsor"
              className="max-h-28 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
