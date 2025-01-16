import React, { useEffect, useRef, useState } from "react";

export default function PengelolaanLingkunganKetenagalistrikan() {
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

  const fadeInStyle = (delay = 0, direction = 'left', immediate = false) => {
    const translateValue = direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
    return {
      opacity: immediate ? 1 : (isVisible ? 1 : 0),
      transform: immediate ? 'translateX(0)' : (isVisible ? 'translateX(0)' : translateValue),
      transition: immediate ? 'none' : `opacity 2s ease ${delay}s, transform 2s ease ${delay}s`, // No transition if immediate
    };
  };

  return (
    <>
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/1.service.jpeg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1
                  className="breadcumb-title font-bold font-sans"
                  style={{ color: '#6C9C43' }}
                >
                  Pengelolaan Lingkungan Ketenagalistrikan
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div
        ref={sectionRef}
        className="service-details-area space-top space-extra-bottom overflow-hidden">
        <div className="container container2">
          <div className="row gx-30 flex-row">
            <div className="col-lg-12">
              <div className="service-page-single">
                <div className="page-content">

                  {/* Gambar di kanan, teks di kiri */}
                  <div className="flex flex-col md:flex-row items-center mb-14">
                    <div className="md:w-1/2 mb-4 md:mb-0" style={fadeInStyle(0.4, 'left')}>
                      <h3 className="page-subtitle mb-4">Air Pollution Control APC</h3>
                      <p>Air Pollution Control-APC (Pengendalian Pencamaran Udara-PPU)</p>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Emisi yang Sudah Ada",
                          "Udara Sekitar",
                          "Udara lingkungan kerja (gas/vapor berbahaya)",
                          "Kebisingan Luar Ruangan",
                          "Kebisingan Dalam Ruangan",
                          "Pencahayaan Lingkungan Kerja",
                          "Iklim Kerja",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6C9C43] flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 12l2 2 5-5 1.41 1.41-6.41 6.41L7 14.41l1.41-1.41zm3-9C6.47 3 2 7.47 2 13c0 5.53 4.47 10 10 10s10-4.47 10-10S17.53 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="text-gray-700 text-lg font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0" style={fadeInStyle(0.5, 'right')}>
                      <img src="/service/air-pollution.jpg" alt="Air Pollution" className="rounded-2xl shadow-lg transform transition duration-300 hover:scale-105" />
                    </div>
                  </div>

                  {/* Gambar di kiri, teks di kanan */}
                  <div className="flex flex-col md:flex-row-reverse items-center mb-14">
                    <div className="md:w-1/2 mb-4 md:mb-0" style={fadeInStyle(0.7, 'left')}>
                      <h3 className="page-subtitle mb-4">Water Pollution Control APC</h3>
                      <p>Water Pollution Control-WPC (Pengendalian Pencamaran Air-PPA)</p>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Air Limbah",
                          "Faktor Kimia Air Laut",
                          "Biologi Air Laut (plankton)",
                          "Air Lindi dan Air Limpasan",
                          "Permukaan Air"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6C9C43] flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 12l2 2 5-5 1.41 1.41-6.41 6.41L7 14.41l1.41-1.41zm3-9C6.47 3 2 7.47 2 13c0 5.53 4.47 10 10 10s10-4.47 10-10S17.53 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="text-gray-700 text-lg font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/2 md:mr-8 mt-8 md:mt-0" style={fadeInStyle(0.8, 'right')}>
                      <img src="/service/water-pollution.jpg" alt="Water Pollution" className="rounded-2xl shadow-lg transform transition duration-300 hover:scale-105" />
                    </div>
                  </div>

                  {/* Gambar di kanan, teks di kiri */}
                  <div className="flex flex-col md:flex-row items-center mb-14">
                    <div className="md:w-1/2 mb-4 md:mb-0" style={fadeInStyle(1, 'left')}>
                      <h3 className="page-subtitle mb-4">Langkah-Langkah Pengoperasian</h3>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Study Analysis EBLS",
                          "Environment Social Assessment (ESA)",
                          "Studi AMDAL / DELH",
                          "Studi UKL UPL/ DPLH",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6C9C43] flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 12l2 2 5-5 1.41 1.41-6.41 6.41L7 14.41l1.41-1.41zm3-9C6.47 3 2 7.47 2 13c0 5.53 4.47 10 10 10s10-4.47 10-10S17.53 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="text-gray-700 text-lg font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0" style={fadeInStyle(1.1, 'right')}>
                      <img src="/service/stage-of-preparation.jpg" alt="Stage Of Preparation" className="rounded-2xl shadow-lg transform transition duration-300 hover:scale-105" />
                    </div>
                  </div>

                  {/* Gambar di kiri, teks di kanan */}
                  <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 mb-4 md:mb-0" style={fadeInStyle(1.7, 'right')}>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Energy Auditing",
                          "Integrated Management System (IMS) 9001,14001 dan 45001",
                          "Green Building Programs Implementation",
                          "SDGs and Sustainable Programs Implementation",
                          "CSR Programs Implementation",
                          "HSE Programs Implementation",
                          "Konsultasi Proper"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6C9C43] flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 12l2 2 5-5 1.41 1.41-6.41 6.41L7 14.41l1.41-1.41zm3-9C6.47 3 2 7.47 2 13c0 5.53 4.47 10 10 10s10-4.47 10-10S17.53 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="text-gray-700 text-lg font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/2 md:mr-8" style={fadeInStyle(1.3, 'left')}>
                      <h3 className="page-subtitle mb-4">Stage Of Operation</h3>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Environmental Monitoring / RKL RPL Implementation",
                          "Water Treatment / Pengolahan Air",
                          "Waste Water Treatment / Pengolahan Limbah Cair",
                          "Bioremediation",
                          "Reclamation",
                          "Environmental Auditing"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6C9C43] flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 12l2 2 5-5 1.41 1.41-6.41 6.41L7 14.41l1.41-1.41zm3-9C6.47 3 2 7.47 2 13c0 5.53 4.47 10 10 10s10-4.47 10-10S17.53 3 12 3zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="text-gray-700 text-lg font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
