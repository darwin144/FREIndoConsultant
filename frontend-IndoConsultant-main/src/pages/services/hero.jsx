/* eslint-disable no-unused-vars */
import React from "react";
import hero from "../../assets/images/services/hero-bg-services-2.jpg";
import CustomBreadcrumb from "@/components/custom-breadcrumb";

export default function Hero() {
  return (
    <div
      className="relative w-full h-[90vh] px-6 pt-36 sm:pt-48 md:pt-60 lg:px-8 lg:pt-32"
      style={{
        backgroundImage: `url('/4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1
        className="font-bold absolute text-center"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          color: '#2B4E92',
          lineHeight: 1.1,
          fontSize: '4rem', // Base font size for small screens
          fontWeight: 800,
          zIndex: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        Our Services
      </h1>

      <style jsx>{`
        @media (min-width: 640px) {
          h1 {
            font-size: 3rem; // Medium font size for sm screens
          }
        }
        @media (min-width: 768px) {
          h1 {
            font-size: 3.5rem; // Large font size for md screens
          }
        }
        @media (min-width: 1024px) {
          h1 {
            font-size: 4rem; // Extra large font size for lg screens
          }
        }
      `}</style>
    </div>
  );
}
