import React, { useEffect, useRef, useState } from 'react';

const Quotes = () => {
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
      className="counter-area-2 space overflow-hidden"
      style={{
        backgroundImage: "url('/counter-2-1-bg.jpg')",
        backgroundSize: "cover", // Makes the image cover the entire div
        backgroundPosition: "center", // Centers the image in the div
        backgroundRepeat: "no-repeat" // Prevents the image from repeating
      }}
    >
      <div className="container container2">
        <div className="row gy-40 justify-content-lg-between justify-content-center">
          <div className="col-lg-12" style={fadeInStyle(0.4)}>
            <div className="testi-box style2 wow fadeInUp" data-wow-delay=".2s" style={fadeInStyle(0.4)}>
              <div className="media wow fadeInUp" data-wow-delay=".2s" style={fadeInStyle(0.7)}>
                <div className="testi-box_profile">
                  <div className="testi-box_img">
                    <img src="/director.jpg" alt="img" />
                  </div>
                  <div className="testi-box_details">
                    <h4 className="testi-box_name">Sanny Wicaksono</h4>
                    <span className="testi-box_desig">
                      Director Indo Consultant
                    </span>
                  </div>
                </div>
                <div className="testi-box_icon">
                  <svg
                    width={53}
                    height={39}
                    viewBox="0 0 53 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_1_9494" fill="white">
                      <path d="M11.25 0.75C4.92188 0.75 0 5.78906 0 12C0 18.3281 4.92188 23.25 11.25 23.25C12.5391 23.25 13.7109 23.0156 15 22.6641V23.25C15 27.4688 11.6016 30.75 7.5 30.75C5.39062 30.75 3.75 32.5078 3.75 34.5C3.75 36.6094 5.39062 38.25 7.5 38.25C15.7031 38.25 22.5 31.5703 22.5 23.25V12C22.5 5.78906 17.4609 0.75 11.25 0.75ZM52.5 12C52.5 5.78906 47.4609 0.75 41.25 0.75C34.9219 0.75 30 5.78906 30 12C30 18.3281 34.9219 23.25 41.25 23.25C42.5391 23.25 43.7109 23.0156 45 22.6641V23.25C45 27.4688 41.6016 30.75 37.5 30.75C35.3906 30.75 33.75 32.5078 33.75 34.5C33.75 36.6094 35.3906 38.25 37.5 38.25C45.7031 38.25 52.5 31.5703 52.5 23.25V12Z" />
                    </mask>
                    <path
                      d="M15 22.6641H16V21.3548L14.7369 21.6993L15 22.6641ZM45 22.6641H46V21.3548L44.7369 21.6993L45 22.6641ZM11.25 -0.25C4.3628 -0.25 -1 5.2436 -1 12H1C1 6.33453 5.48095 1.75 11.25 1.75V-0.25ZM-1 12C-1 18.8804 4.36959 24.25 11.25 24.25V22.25C5.47416 22.25 1 17.7758 1 12H-1ZM11.25 24.25C12.6659 24.25 13.9348 23.9911 15.2631 23.6288L14.7369 21.6993C13.487 22.0402 12.4123 22.25 11.25 22.25V24.25ZM14 22.6641V23.25H16V22.6641H14ZM14 23.25C14 26.9063 11.0595 29.75 7.5 29.75V31.75C12.1436 31.75 16 28.0312 16 23.25H14ZM7.5 29.75C4.81817 29.75 2.75 31.9759 2.75 34.5H4.75C4.75 33.0397 5.96308 31.75 7.5 31.75V29.75ZM2.75 34.5C2.75 37.1617 4.83834 39.25 7.5 39.25V37.25C5.94291 37.25 4.75 36.0571 4.75 34.5H2.75ZM7.5 39.25C16.2503 39.25 23.5 32.1277 23.5 23.25H21.5C21.5 31.013 15.1559 37.25 7.5 37.25V39.25ZM23.5 23.25V12H21.5V23.25H23.5ZM23.5 12C23.5 5.23678 18.0132 -0.25 11.25 -0.25V1.75C16.9087 1.75 21.5 6.34135 21.5 12H23.5ZM53.5 12C53.5 5.23678 48.0132 -0.25 41.25 -0.25V1.75C46.9087 1.75 51.5 6.34135 51.5 12H53.5ZM41.25 -0.25C34.3628 -0.25 29 5.2436 29 12H31C31 6.33453 35.481 1.75 41.25 1.75V-0.25ZM29 12C29 18.8804 34.3696 24.25 41.25 24.25V22.25C35.4742 22.25 31 17.7758 31 12H29ZM41.25 24.25C42.6659 24.25 43.9348 23.9911 45.2631 23.6288L44.7369 21.6993C43.487 22.0402 42.4123 22.25 41.25 22.25V24.25ZM44 22.6641V23.25H46V22.6641H44ZM44 23.25C44 26.9063 41.0595 29.75 37.5 29.75V31.75C42.1436 31.75 46 28.0312 46 23.25H44ZM37.5 29.75C34.8182 29.75 32.75 31.9759 32.75 34.5H34.75C34.75 33.0397 35.9631 31.75 37.5 31.75V29.75ZM32.75 34.5C32.75 37.1617 34.8383 39.25 37.5 39.25V37.25C35.9429 37.25 34.75 36.0571 34.75 34.5H32.75ZM37.5 39.25C46.2503 39.25 53.5 32.1277 53.5 23.25H51.5C51.5 31.013 45.1559 37.25 37.5 37.25V39.25ZM53.5 23.25V12H51.5V23.25H53.5Z"
                      fill="#4BAF47"
                      mask="url(#path-1-inside-1_1_9494)"
                    />
                  </svg>
                </div>
              </div>
              <p className="testi-box_text wow fadeInLeft" data-wow-delay=".3s" style={fadeInStyle(1)}>
                Lingkungan hidup merupakan karunia dan rahmat Tuhan Yang Maha Esa
                kepada umat manusia sebagai ruang bagi kehidupan dalam segala aspek
                dan matranya. Manusia dengan kemampuan berpikir dan kepekaan
                emosinya merupakan makhluk yang mumpuni di bumi ini. Telah menjadi
                sifat manusia untuk selalu meningkatkan taraf hidup, sehingga ia
                melakukan berbagai inovasi yang dapat mempermudah dan meningkatkan
                kehidupannya.
              </p>
              <p className="testi-box_text wow fadeInRight" data-wow-delay=".4s" style={fadeInStyle(1.2)}>
                Lingkungan hidup bukanlah warisan dari pendahulu kita, tetapi
                titipan generasi mendatang. Setiap kegiatan pembangunan harus selalu
                memberi kesempatan kepada generasi mendatang untuk mampu memenuhi
                kebutuhannya. Pembangunan serta pengelolaan lingkungan menjadi
                tanggung jawab tak terbatas bagi kita semua untuk terjaminnya
                kelangsungan kehidupan generasi saat ini dan generasi masa yang akan
                datang.
              </p>
              <p className="testi-box_text wow fadeInUp" data-wow-delay=".5s" style={fadeInStyle(1.4)}>
                Indo Consultant hadir dalam rangka mewujudkan terciptanya
                penyelarasan antara imperatif pembangunan dan kewajiban moral, dalam
                rangka mewujudkan lingkungan yang lestari melalui bisnis perusahaan
                yang berkelanjutan dengan keahliannya dalam jasa-jasa layanan
                Pemeriksaan &amp; Fasilitator kinerja bisnis berkelanjutan baik
                secara teknik dan manajemen bagi perusahaan anda. Indo Consultant
                hendak mewujudkan satu visi besar kedepan yaitu menjadi perusahaan
                bisnis lingkungan terbaik di Indonesia dan sebagai mitra bisnis bagi
                perusahaan dalam upaya menciptakan pembangunan yang berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
