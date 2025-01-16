/* eslint-disable no-unused-vars */
import React from "react";

const AboutCompany = () => {
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
          margin: '-0.2em 0 -0.2em 0',
          lineHeight: 1.1,
          fontSize: '60px',
          fontWeight: 800,
          zIndex: 1,
          top: '50%',
          right: '1%',
          width: '100%',
          transform: 'translateY(-50%)',
        }}
      >
        About Us
      </h1>
    </div>
  );
};

export default AboutCompany;
