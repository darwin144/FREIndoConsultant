/* eslint-disable no-unused-vars */
import React from "react";
import hero from "../../assets/images/hero/breadcrumb-bg-about.jpg";
import CustomBreadcrumb from "@/components/custom-breadcrumb";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[90vh] px-6 pt-36 sm:pt-60 lg:px-8 lg:pt-32"
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
          fontSize: '4rem', // Responsive font size
          fontWeight: 800,
          zIndex: 1,
          top: '50%',
          left: '50%', // Center the text
          transform: 'translate(-50%, -50%)', // Center the text vertically and horizontally
        }}
      >
        Contact
      </h1>
    </div>
  );
};

export default Hero;
