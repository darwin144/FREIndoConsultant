/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import StrukturPengurusImage from "../../assets/images/struktur-pengurus-transformed.jpeg";

const StrukturPengurus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once it's visible
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const fadeInStyle = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
    transition: `opacity 1.7s ease ${delay}s, transform 1.7s ease ${delay}s`,
  });
  return (
    <div 
    ref={sectionRef}
    className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4" style={fadeInStyle(0.4)}>
          <img
            alt="Struktur Pengurus Images"
            src={StrukturPengurusImage}
            width={2432}
            height={1442}
            className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>
      </div>
    </div>
  );
};

export default StrukturPengurus;
