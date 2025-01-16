/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { HiArrowSmallUp } from "react-icons/hi2";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll event
  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const scrollPercentage = (currentScroll / totalHeight) * 100;
    setScrollProgress(scrollPercentage);

    // Show button after scrolling down 100px
    setIsVisible(currentScroll > 100);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg bg-blue-500 transition-all duration-500 border-blue ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{
          background: `conic-gradient(from 0deg, #2F4F75 ${scrollProgress}%, #E5E7EB ${scrollProgress}%)`,
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '50%', // Membuat elemen bulat
            width: '40px', // Lebar elemen SVG
            height: '40px', // Tinggi elemen SVG
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2" // Menambah ketebalan garis
            stroke="currentColor"
            style={{ width: '24px', height: '24px' }} // Ukuran SVG
          >
            <path
              fill="blue"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </div>
      </button>

    </>
  );  
};

export default ScrollToTop;