import React, { useEffect, useRef, useState } from 'react';

export default function VissionMission() {
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
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <div
      ref={sectionRef}
      className="flex flex-col lg:flex-row justify-center items-center lg:space-x-10 space-y-6 lg:space-y-0 overflow-hidden p-4"
    >
      <div className="about-thumb2 max-w-xs md:max-w-sm mb-6 lg:mb-0" style={fadeInStyle(0.4)}>
        <div className="about-img-1" style={fadeInStyle(0.5)}>
          <img src="/about_1-1-testt.jpg" alt="img" className="w-full rounded" />
        </div>
        <div className="about-img-2 video-wrap jump-reverse mt-4" style={fadeInStyle(0.6)}>
          <img src="/about_1-2-testt.jpg" alt="img" className="w-full rounded" />
          <a
            href="https://www.youtube.com/watch?v=1kUE0BZtTRc"
            className="play-btn popup-video"
            style={fadeInStyle(0.7)}
          >
            <i className="fas fa-solid fa-play" />
          </a>
        </div>
        <div className="about-shape-1 jump mt-4" style={fadeInStyle(0.8)}>
          <img src="/about_2-3.png" alt="img" className="w-full rounded" />
        </div>
      </div>
      <div className="about-content-wrap flex flex-col max-w-md space-y-4 lg:mt-4 text-center lg:text-left">
        <div className="title-area mb-4" style={fadeInStyle(0.5)}>
          <span className="sub-title text-lg md:text-xl">VISI</span>
          <h2 className="sec-title text-2xl md:text-3xl font-semibold mt-2" style={fadeInStyle(0.6)}>
          Perusahaan terkemuka dalam memberikan layanan pemeriksaan dan fasilitator yang independen, profesional, dan terpercaya, dalam mendukung kepatuhan dan pertumbuhan bisnis berkelanjutan
          </h2>
        </div>
        <div className="about-list-wrap space-y-4" style={fadeInStyle(0.7)}>
          <span className="sub-title text-lg md:text-xl">MISI</span>
          <div className="about-list-box flex items-center" style={fadeInStyle(1)}>
            <div className="about-list-icon mr-2">
              <i className="fas fa-check text-green-500" />
            </div>
            <div className="list-content-area">
              <h3 className="list-title text-base md:text-lg">
              Menyediakan layanan pemeriksaan dan fasilitasi yang berkualitas tinggi yang memenuhi standar nasional dan internasional
              </h3>
            </div>
          </div>
          <div className="about-list-box flex items-center" style={fadeInStyle(1.1)}>
            <div className="about-list-icon mr-2">
              <i className="fas fa-check text-green-500" />
            </div>
            <div className="list-content-area">
              <h3 className="list-title text-base md:text-lg">
              Membangun kepercayaan melalui profesionalitas, integritas, kejujuran, dan transparansi dalam setiap proses pemeriksaan dan fasilitasi
              </h3>
            </div>
          </div>
          <div className="about-list-box flex items-center" style={fadeInStyle(1.2)}>
            <div className="about-list-icon mr-2">
              <i className="fas fa-check text-green-500" />
            </div>
            <div className="list-content-area">
              <h3 className="list-title text-base md:text-lg">
              Menggunakan teknologi dan metodologi terkini untuk meningkatkan efisiensi dan akurasi dalam pekerjaan yang dijalani
              </h3>
            </div>
          </div>
          <div className="about-list-box flex items-center" style={fadeInStyle(1.2)}>
            <div className="about-list-icon mr-2">
              <i className="fas fa-check text-green-500" />
            </div>
            <div className="list-content-area">
              <h3 className="list-title text-base md:text-lg">
              Mengembangkan tim profesional yang berkompeten dan berdikasi untuk memberikan nilai tambah kepada perusahaan
              </h3>
            </div>
          </div>
          <div className="about-list-box flex items-center" style={fadeInStyle(1.2)}>
            <div className="about-list-icon mr-2">
              <i className="fas fa-check text-green-500" />
            </div>
            <div className="list-content-area">
              <h3 className="list-title text-base md:text-lg">
              Mendukung praktik bisnis yang berkelanjutan dan etis dalam setiap operasi perusahaan.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
