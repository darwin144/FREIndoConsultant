import React, { useEffect, useRef, useState } from 'react';

const SistemManajemenKeselamatanKetengalistrikan = () => {
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
    transform: isVisible ? "scale(1)" : "scale(0.95)",
    transition: `opacity 2s ease ${delay}s, transform 2s ease ${delay}s`, // Increased duration to 2s
  });

  return (
    <>
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/1.service.jpeg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1
                  className="breadcumb-title font-bold"
                  style={{ color: '#2B4E92' }}
                >
                  Pemeriksaan dan Penilaian Penerapan Sistem Manajemen Keselamatan Ketenagalistrikan
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
                <div className="page-img mb-40 wow fadeInUp" data-wow-delay=".5s" style={fadeInStyle(0.6)}>
                  <img
                    src="/training-and-educationss.jpg"
                    alt="img"
                  />
                </div>
                <div className="page-content">
  <div className="content-wrapper">
    <div className="w-full md:w-1/2 mb-8 md:mb-0">
      <div className="service-wrap">
        <h3 className="page-subtitle mb-4 font-semibold wow fadeInRight" data-wow-delay=".7s" style={fadeInStyle(1.4)}>
          Indo Consultant melayani jasa sistem manajemen dan keselamatan ketenagalistrikan, yang meliputi:
        </h3>
        <div className="checklist mt-4">
          <ul className="space-y-2">
            <li className="wow fadeInRight flex items-center" data-wow-delay=".8s" style={fadeInStyle(1.5)}>
              <i className="fas fa-check-circle text-purple-600 mr-2" />
              Menyelenggarakan pelatihan teknis pengenalan keselamatan ketenagalistrikan
            </li>
            <li className="wow fadeInRight flex items-center" data-wow-delay=".9s" style={fadeInStyle(1.6)}>
              <i className="fas fa-check-circle text-purple-600 mr-2" />
              Membuat sistem manajemen dan keselamatan ketenagalistrikan
            </li>
            <li className="wow fadeInRight flex items-center" data-wow-delay=".9s" style={fadeInStyle(1.6)}>
              <i className="fas fa-check-circle text-purple-600 mr-2" />
              Memfasilitasi dan pendampingan program keselamatan dan ketenagalistrikan
            </li>
            <li className="wow fadeInRight flex items-center" data-wow-delay=".9s" style={fadeInStyle(1.6)}>
              <i className="fas fa-check-circle text-purple-600 mr-2" />
              Melakukan monitoring dan evaluasi kinerja sistem manajemen keselamatan ketenagalistrikan
            </li>
          </ul>
        </div>
      </div>
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
};

export default SistemManajemenKeselamatanKetengalistrikan;
