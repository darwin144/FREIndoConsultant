import React, { useEffect, useRef, useState } from "react";

export default function SurveyMapping() {
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

  const fadeInStyleDicection = (delay = 0, direction = 'left', immediate = false) => {
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
                  className="breadcumb-title"
                  style={{ color: '#2B4E92' }}
                >
                  Pemeriksaan dan Penilaian Kompensasi Tanah, Bangunan dan/atau Tanaman yang Berada di Bawah Ruang Bebas Jaringan Transmisi Tenaga Listrik
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
                  <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8">
                      <div className="title-area text-center" style={fadeInStyle(0.4)}>
                        <h2 className="sec-title wow fadeInUp" data-wow-delay=".1s">
                          Perencanaan
                        </h2>
                        <h2 className="sec-title wow fadeInUp" data-wow-delay=".1s">
                          Penempatan Jaringan
                        </h2>
                        <h2 className="sec-title wow fadeInUp" data-wow-delay=".1s">
                          Utilitas Bawah Tanah
                        </h2>
                        <span className="sub-title wow fadeInUp" data-wow-delay=".2s">
                          SALURAN KABEL TEGANGAN TINGGI (SKTT 150 KV)
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Gambar di kanan, teks di kiri */}
                  <div className="flex flex-col md:flex-row items-center mb-14">
                    <div className="md:w-1/2 mb-4 md:mb-0" style={fadeInStyleDicection(0.7, 'left')}>
                      <h3 className="page-subtitle mb-4">Survey Topografi</h3>
                      <p>Maksud dan Tujuan Survey Topografi</p>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Untuk mendapatkan gambaran geografis, kondisi sosial dan lingkungan suatu daerah.",
                          "Untuk mendapatkan lokasi trace jakur SKTT yang terbaik memenuhi aspek keandalan, workability, maintenace dan sesuai dengan peruntukkan pada masterplan utilitas daerah.",
                          "Untuk mendapatkan lokasi yang akurat dan jelas untuk penempatan perangkat penunjang seperti joinpit, manhole dan penempatan pulling cable saat konstruksi dll.",
                          "Untuk mengetahui status pemilik lahan dan tata guna lahan.",
                          "Untuk mengetahui stakeholder pada proyek tersebut."
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2f4f75] flex items-center justify-center">
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
                    <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0" style={fadeInStyle(0.8)}>
                      <img src="/service/services-5-1.jpg" alt="Air Pollution" className="rounded-2xl shadow-lg transform transition duration-300 hover:scale-105" />
                    </div>
                  </div>

                  {/* Gambar di kiri, teks di kanan */}
                  <div className="flex flex-col md:flex-row-reverse items-center mb-14">
                    <div className="md:w-1/2 mb-4 md:mb-0" style={fadeInStyleDicection(0.9, 'right')}>
                      <h3 className="page-subtitle mb-4">Kegiatan yang Dilakukan Pada Pekerjaan Survey Topografi</h3>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Survey Reconnaissance.",
                          "Pengambilan data primer, pengukuran jarak, koordinat, koridor SKTT, pemasangan BM, pembuatan profile memanjang.",
                          "Melakukan Perijinan ke Pemerintah setempat.",
                          "Merencanakan titik joinpit, manhole dan lokasi pulling cable.",
                          "Melakukan penggambaran."
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2f4f75] flex items-center justify-center">
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
                    <div className="md:w-1/2 md:mr-8 mt-8 md:mt-0" style={fadeInStyle(1)}>
                      <img src="/service/services-5-2.jpg" alt="Water Pollution" className="rounded-2xl shadow-lg transform transition duration-300 hover:scale-105" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="process-area-3 space-bottom overflow-hidden relative">
        <div className="absolute bottom-0 right-0">
          <img src="/process-shape1-2.png" alt="img" className="max-w-full h-auto" />
        </div>
        <div
          className="process-shape3_2 shape-mockup jump-reverse d-lg-block d-none"
          data-top={0}
          data-left={0}
        >
          <img src="/service/service-shape1-2.png" alt="img" />
        </div>
        <div className="container container2">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div className="title-area text-center">
                <span className="sub-title wow fadeInUp" data-wow-delay=".5s">
                  WORK PROCESS
                </span>
                <h2 className="sec-title wow fadeInUp" data-wow-delay=".6s">
                  Beberapa Tahapan Dalam Pembangunan Jaringan Transmisi
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-0 md:space-x-4">
             <div className="w-full md:w-1/3 lg:w-1/4 process-card-wrap mb-4"> 
              <div
                className="process-card style3 wow fadeInLeft"
                data-wow-delay=".7s"
              >
                <div className="process-card-icon">
                  <div className="process-num">01</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={80}
                    height={80}
                    viewBox="0 0 50 50"
                    fill="none"
                  >
                    <path
                      d="M38.7472 27.8337C40.7805 24.9762 41.855 21.6065 41.855 18.089C41.855 8.80376 34.2938 1.25 24.9996 1.25C22.7143 1.25 20.4983 1.69902 18.4121 2.58475C17.5891 2.9341 18.1253 4.21875 18.9571 3.86532C20.8698 3.05329 22.9027 2.6416 24.9996 2.6416C33.5257 2.6416 40.462 9.57118 40.462 18.089C40.462 21.3157 39.4762 24.4068 37.6117 27.0277C35.7873 29.5923 33.2668 31.5176 30.3233 32.5961C30.1895 32.6453 30.074 32.7344 29.9925 32.8512C29.9109 32.9681 29.8672 33.1071 29.8672 33.2496V34.7348L25.6966 34.9815V28.7037L27.7864 26.7543C28.7467 26.7256 31.8463 26.4705 33.8957 24.4231C36.2942 22.0266 36.2359 18.1921 36.2324 18.0301C36.2284 17.851 36.1554 17.6803 36.0287 17.5536C35.902 17.4269 35.7312 17.3538 35.5519 17.3497C35.3896 17.346 31.5515 17.2879 29.1524 19.6844C27.1282 21.7065 26.854 24.753 26.8197 25.7524L25.6966 26.7998V20.0949C26.0426 19.725 26.7431 18.9124 27.3371 17.8173C27.7638 17.0319 26.54 16.3674 26.1131 17.1543C25.7677 17.79 25.3777 18.3191 25.0693 18.6955C25.0466 18.6931 25.0234 18.6917 25.0002 18.6917C24.977 18.6917 24.9537 18.6932 24.9311 18.6954C24.2103 17.8141 23.039 16.0833 23.039 14.144C23.039 12.1404 24.2898 10.3592 25.0007 9.50832C25.7129 10.3566 26.9608 12.1317 26.9608 14.144C26.9608 14.3052 26.9526 14.4702 26.9364 14.6343C26.849 15.5232 28.235 15.6612 28.323 14.7706C28.3434 14.5624 28.3537 14.3533 28.3537 14.144C28.3537 10.7552 25.5986 8.0848 25.481 7.97288C25.3515 7.8491 25.1791 7.78002 24.9999 7.78002C24.8206 7.78002 24.6483 7.8491 24.5187 7.97288C24.4012 8.0848 21.646 10.7549 21.646 14.144C21.646 17.0221 23.6324 19.3809 24.3037 20.0958V26.7969L23.1792 25.7445C23.1438 24.7373 22.8658 21.7013 20.8465 19.6841C18.4477 17.2876 14.609 17.3456 14.4474 17.3497C14.2681 17.3538 14.0974 17.4268 13.9706 17.5534C13.8439 17.6801 13.7709 17.8507 13.7669 18.0298C13.7631 18.1916 13.7047 22.0261 16.1032 24.4228C18.1593 26.4768 21.2711 26.7273 22.2209 26.7543L24.3037 28.7037V35.0636L20.1324 35.3109V33.2493C20.1323 33.1068 20.0884 32.9678 20.0068 32.851C19.9251 32.7342 19.8095 32.6452 19.6756 32.5961C16.7323 31.5176 14.2122 29.592 12.3875 27.0271C10.5229 24.4062 9.53745 21.3154 9.53745 18.0887C9.53745 15.6093 10.1074 13.2415 11.2311 11.0516C12.3039 8.96155 13.8695 7.1118 15.7582 5.70283C16.4822 5.16244 15.6403 4.05465 14.9247 4.58754C12.8663 6.1232 11.1608 8.13869 9.99159 10.4166C8.76578 12.805 8.14448 15.3863 8.14448 18.0886C8.14448 21.6062 9.21911 24.9757 11.2519 27.8331C13.1455 30.4946 15.7268 32.5248 18.7394 33.7277V35.3932C15.7761 35.4573 15.7329 39.9873 18.7394 39.9191V41.6862C15.656 41.7868 15.9032 46.4179 19.0244 46.1975C19.6178 47.6912 21.0781 48.75 22.7816 48.75H27.2176C29.1843 48.75 30.8265 47.3395 31.1861 45.478L32.1725 45.4194C35.0696 45.2475 34.8354 40.7344 31.9046 40.9072L31.2598 40.9452V39.2778C31.2598 39.2451 31.2583 39.2129 31.2572 39.1805L32.1725 39.1265C35.0661 38.9554 34.8418 34.4403 31.9046 34.614L31.2598 34.6519V33.728C34.2727 32.5248 36.854 30.4951 38.7472 27.8337ZM30.1376 20.6684C31.5558 19.2512 33.701 18.8755 34.8064 18.7761C34.7088 19.8789 34.3351 22.0162 32.9111 23.4388C31.4925 24.8556 29.3477 25.2316 28.2423 25.3308C28.3395 24.2283 28.7133 22.091 30.1376 20.6684ZM15.1947 18.7766C16.3009 18.8758 18.4445 19.2524 19.8616 20.6684C21.238 22.0431 21.633 24.1018 21.7459 25.2319C21.7222 25.2509 21.6998 25.2715 21.6788 25.2934C21.6701 25.303 21.6623 25.3131 21.6541 25.323C20.5247 25.2119 18.4701 24.8196 17.0882 23.4388C15.6708 22.0226 15.2945 19.8812 15.1947 18.7766ZM32.0398 36.0017C33.1267 36.0017 33.1759 37.6729 32.0897 37.7372L18.7419 38.5276C18.502 38.5426 18.2727 38.4594 18.0968 38.2956C18.0104 38.2155 17.9413 38.1186 17.8938 38.0108C17.8463 37.903 17.8215 37.7866 17.8209 37.6688C17.8187 37.4459 17.9024 37.2307 18.0547 37.0677C18.207 36.9048 18.4161 36.8066 18.6389 36.7935L31.987 36.0029C32.0048 36.002 32.0225 36.0017 32.0399 36.0017H32.0398ZM32.6318 42.5284C33.1756 43.0358 32.8317 43.9863 32.09 44.0301L28.7658 44.227C27.8734 44.2797 27.9543 45.6682 28.8484 45.6163L29.7249 45.5644C29.3691 46.6064 28.3798 47.3584 27.2175 47.3584H22.7816C21.8334 47.3584 21.0011 46.8583 20.5328 46.1089L25.6908 45.8033C26.5834 45.7505 26.5022 44.3638 25.6084 44.4143L18.7419 44.821C17.6224 44.8885 17.5216 43.1529 18.6389 43.0867L31.987 42.2965C32.1046 42.289 32.2225 42.3057 32.3335 42.3456C32.4444 42.3855 32.5459 42.4477 32.6318 42.5284ZM20.1324 41.6039V39.8393L29.8662 39.2633C29.8662 39.2679 29.8668 39.2729 29.8668 39.2778V41.0277L20.1324 41.6039ZM10.8872 5.39118C11.5088 6.02664 12.5065 5.05631 11.884 4.41877L9.15871 1.63096C8.53422 0.991719 7.53648 1.96287 8.16216 2.6033L10.8872 5.39118ZM4.65769 7.4443L8.0121 9.43291C8.77537 9.88491 9.49621 8.69444 8.72306 8.23643L5.36844 6.24759C4.59937 5.79189 3.88722 6.9877 4.65769 7.4443ZM2.5265 13.0267L6.28222 14.0802C7.14177 14.3211 7.5214 12.9823 6.65866 12.7405L2.90315 11.6869C2.04182 11.4457 1.66427 12.7852 2.5265 13.0266V13.0267ZM5.8231 19.0167C6.71237 19.0167 6.72218 17.6358 5.83157 17.6251L1.93098 17.5787C1.03918 17.5505 1.01251 18.9596 1.91471 18.97L5.815 19.0164C5.81797 19.0167 5.82072 19.0167 5.8231 19.0167ZM7.14504 23.0593C7.1225 22.9708 7.08271 22.8875 7.02794 22.8143C6.97317 22.7412 6.90449 22.6795 6.82584 22.6328C6.74718 22.5862 6.66009 22.5555 6.56956 22.5425C6.47902 22.5295 6.38681 22.5345 6.29819 22.5572L2.51862 23.5211C1.65209 23.7418 1.99658 25.0905 2.86311 24.8692L6.64268 23.9056C7.01533 23.8108 7.24021 23.4315 7.14504 23.0593ZM8.97476 27.4666C8.78666 27.1315 8.36186 27.0124 8.02666 27.2004L4.62552 29.1084C3.84457 29.547 4.53117 30.7577 5.30752 30.3217L8.70858 28.4138C9.04408 28.2256 9.16309 27.8018 8.97469 27.4666H8.97476Z"
                      fill="#4BAF47"
                    />
                    <path
                      d="M10.8997 31.239L8.10858 33.9616C7.47732 34.5774 8.43732 35.5857 9.08187 34.9571L11.8725 32.2348C12.5126 31.6106 11.5402 30.6136 10.8997 31.239ZM39.1121 31.2509C38.4876 30.6113 37.4899 31.5828 38.1156 32.2227L40.8406 35.0111C41.4621 35.6471 42.4604 34.6762 41.8374 34.0393L39.1121 31.2509ZM45.3421 29.1977L41.9874 27.2091C41.2184 26.7537 40.5062 27.9492 41.2767 28.4055L44.6312 30.3942C45.3944 30.8464 46.1149 29.656 45.3421 29.1977ZM47.4728 23.6147L43.7173 22.5618C42.8566 22.32 42.4784 23.6596 43.3406 23.9014L47.0964 24.9544C47.9563 25.196 48.3356 23.8567 47.4728 23.6147ZM48.0848 17.6717L44.1845 17.6253C43.2927 17.5971 43.2661 19.0062 44.1677 19.0166L48.0686 19.063C48.96 19.0915 48.9871 17.6824 48.0848 17.6717ZM42.8543 13.5827C42.9468 13.9451 43.3401 14.1771 43.7013 14.0849L47.4809 13.1209C48.3474 12.9003 48.0041 11.5507 47.1364 11.7727L43.3565 12.7365C42.9843 12.8313 42.7593 13.2099 42.8543 13.5827ZM41.0245 9.17539C41.2082 9.50158 41.6484 9.6233 41.9732 9.44094L45.3741 7.533C46.1538 7.09556 45.473 5.88193 44.6921 6.31975L41.291 8.22828C40.9557 8.41643 40.8362 8.84029 41.0245 9.17539ZM38.6139 5.60131C38.7894 5.60131 38.965 5.53526 39.1005 5.403L41.8911 2.68065C42.5309 2.05618 41.5588 1.05949 40.9183 1.68479L38.1272 4.40743C37.6924 4.83129 37.9966 5.60131 38.6139 5.60131Z"
                      fill="#4BAF47"
                    />
                  </svg>
                </div>
                <h3
                  className="process-card-title wow fadeInLeft"
                  data-wow-delay=".8s"
                >
                  Perencanaan
                </h3>
                <div className="checklist mb-30 mt-25">
                  <ul>
                    <li className="wow fadeInLeft" data-wow-delay=".9s">
                      <i className="fas fa-check-circle" />
                      Study Desktop
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1s">
                      <i className="fas fa-check-circle" />
                      Survey dan Pengukuran/Pemetaan Jalur
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1.1s">
                      <i className="fas fa-check-circle" />
                      Soil Investigasi
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1.2s">
                      <i className="fas fa-check-circle" />
                      Perencanaan Joinpit
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1.3s">
                      <i className="fas fa-check-circle" />
                      Testpit
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1.4s">
                      <i className="fas fa-check-circle" />
                      Pembuatan Longprofile
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1.5s">
                      <i className="fas fa-check-circle" />
                      Pembuatan Kabel Schedule
                    </li>
                  </ul>
                </div>
              </div>
            </div>
             <div className="w-full md:w-1/3 lg:w-1/4 process-card-wrap mb-4"> 
              <div className="process-card style3 wow fadeInUp" data-wow-delay="1.6s">
                <div className="process-card-icon">
                  <div className="process-num">02</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={80}
                    height={80}
                    viewBox="0 0 65 65"
                    fill="none"
                  >
                    <path
                      d="M62.4705 24.8288H51.3748C51.256 24.8287 51.1383 24.8521 51.0286 24.8975C50.9188 24.9429 50.8191 25.0095 50.7351 25.0934C50.6511 25.1773 50.5844 25.2769 50.539 25.3866C50.4935 25.4962 50.4702 25.6138 50.4702 25.7324V30.8735H43.7163V25.7324C43.7164 25.6138 43.693 25.4962 43.6476 25.3865C43.6021 25.2769 43.5355 25.1772 43.4515 25.0933C43.3675 25.0094 43.2678 24.9428 43.158 24.8974C43.0482 24.8521 42.9306 24.8287 42.8118 24.8288H31.7161C31.4762 24.8288 31.2461 24.924 31.0765 25.0935C30.9068 25.2629 30.8115 25.4928 30.8115 25.7324V36.41L19.8063 47.683H18.3183L15.3869 23.0165C15.3608 22.7967 15.2549 22.5941 15.0893 22.4471C14.9237 22.3001 14.7098 22.219 14.4883 22.219H12.3589V19.2355C13.8287 19.1556 16.5816 18.7422 18.4396 16.8626C21.0247 14.2476 20.7481 9.93526 20.735 9.75346C20.7194 9.53469 20.6247 9.32904 20.4685 9.17489C20.3123 9.02073 20.1054 8.92859 19.8862 8.91564C19.7731 8.90928 18.0797 8.82224 16.1926 9.37349C15.6277 5.17301 12.0404 2.01854 11.8761 1.87579C11.7102 1.73212 11.4976 1.65366 11.2781 1.65505C11.0585 1.65643 10.8469 1.73756 10.6829 1.88331C10.5065 2.03965 6.36701 5.76918 6.39596 10.4848C6.42201 14.6092 9.62741 17.9396 10.5497 18.8131V22.2195H8.22887C8.00743 22.2194 7.79365 22.3005 7.62811 22.4475C7.46257 22.5944 7.35677 22.7969 7.3308 23.0166L6.30227 31.6709C6.16546 32.8232 7.96171 33.0381 8.09881 31.8841L8.32883 29.9495H14.3892L16.4964 47.6831H6.22123L7.5833 36.2216C7.72011 35.068 5.92608 34.8375 5.78666 36.0086L4.3997 47.683H2.52954C2.03014 47.683 1.625 48.0877 1.625 48.5866V62.4412C1.625 62.9405 2.03023 63.3448 2.52954 63.3448H62.4705C62.5893 63.3449 62.7069 63.3216 62.8167 63.2762C62.9265 63.2308 63.0262 63.1642 63.1102 63.0803C63.1942 62.9964 63.2608 62.8967 63.3063 62.7871C63.3517 62.6774 63.3751 62.5599 63.375 62.4412V53.224C63.375 52.0639 61.5659 52.062 61.5659 53.224V61.5376H3.43408V49.4904H20.1881C20.3087 49.4904 20.4281 49.4662 20.5393 49.4194C20.6504 49.3726 20.751 49.304 20.8352 49.2177L32.3636 37.4081C32.5284 37.2394 32.6206 37.0131 32.6206 36.7774V26.6362H41.9072V36.7774C41.9072 36.8961 41.9306 37.0136 41.976 37.1233C42.0215 37.2329 42.0881 37.3325 42.1721 37.4165C42.2561 37.5004 42.3558 37.5669 42.4656 37.6123C42.5753 37.6577 42.693 37.6811 42.8118 37.6811H51.3748C51.4936 37.6811 51.6112 37.6578 51.721 37.6124C51.8308 37.567 51.9305 37.5004 52.0145 37.4165C52.0985 37.3326 52.1651 37.233 52.2106 37.1233C52.256 37.0136 52.2794 36.8961 52.2793 36.7774V26.6362H61.5659V48.5249C61.5659 49.685 63.375 49.6869 63.375 48.5249V25.7325C63.3751 25.6138 63.3517 25.4963 63.3063 25.3866C63.2608 25.277 63.1942 25.1773 63.1102 25.0934C63.0262 25.0095 62.9265 24.9429 62.8167 24.8975C62.7069 24.8521 62.5893 24.8287 62.4705 24.8288ZM43.7163 32.6808H50.4702V35.8737H43.7163V32.6808ZM13.6852 24.0264L14.1743 28.1423H8.54283L9.0324 24.0264H13.6852ZM18.927 10.7342C18.869 11.944 18.5603 14.1689 17.1526 15.5926C15.7441 17.0177 13.5193 17.3536 12.3099 17.4259C12.3265 17.0787 12.3642 16.6461 12.4437 16.1686C12.6216 15.1042 13.0505 13.615 14.0861 12.5672C15.4939 11.1432 17.7171 10.8069 18.927 10.7342ZM12.7991 11.2975C11.3692 12.7438 10.8154 14.7085 10.6079 16.2071C9.53517 14.8855 8.2199 12.795 8.20514 10.4733C8.18671 7.55683 10.2461 4.96066 11.2916 3.83145C12.308 4.90234 14.2724 7.31094 14.4469 10.0798C13.8615 10.3947 13.2974 10.793 12.7991 11.2975Z"
                      fill="#4BAF47"
                    />
                    <path
                      d="M38.436 43.1988H34.5747C34.3348 43.1988 34.1048 43.294 33.9352 43.4635C33.7655 43.633 33.6703 43.8628 33.6703 44.1024V56.0142C33.6703 56.5139 34.0755 56.9179 34.5748 56.9179H38.4361C38.5549 56.918 38.6726 56.8947 38.7823 56.8493C38.8921 56.8039 38.9919 56.7373 39.0759 56.6534C39.1599 56.5695 39.2265 56.4698 39.2719 56.3602C39.3173 56.2505 39.3407 56.1329 39.3405 56.0142V44.1024C39.3405 43.6035 38.9354 43.1988 38.436 43.1988ZM37.5315 55.1105H35.4792V45.0061H37.5315V55.1105ZM47.4822 43.1988H43.6209C43.381 43.1988 43.151 43.294 42.9813 43.4635C42.8117 43.633 42.7164 43.8628 42.7164 44.1024V56.0142C42.7164 56.5139 43.1216 56.9179 43.621 56.9179H47.4823C47.6011 56.9179 47.7187 56.8946 47.8285 56.8492C47.9382 56.8038 48.0379 56.7372 48.1219 56.6533C48.2059 56.5694 48.2725 56.4697 48.318 56.3601C48.3634 56.2504 48.3868 56.1329 48.3867 56.0142V44.1024C48.3867 43.6035 47.9816 43.1988 47.4822 43.1988ZM46.5777 55.1105H44.5254V45.0061H46.5777V55.1105ZM56.528 43.1988H52.6667C52.4268 43.1988 52.1968 43.294 52.0271 43.4635C51.8575 43.633 51.7622 43.8628 51.7622 44.1024V56.0142C51.7622 56.5139 52.1674 56.9179 52.6668 56.9179H56.5281C56.6469 56.9179 56.7645 56.8946 56.8742 56.8492C56.984 56.8038 57.0837 56.7372 57.1677 56.6533C57.2517 56.5694 57.3183 56.4697 57.3638 56.3601C57.4092 56.2504 57.4326 56.1329 57.4325 56.0142V44.1024C57.4325 43.6035 57.0274 43.1988 56.528 43.1988ZM55.6234 55.1105H53.5712V45.0061H55.6234V55.1105ZM28.0979 55.1515H7.59497C7.09557 55.1515 6.69043 55.5559 6.69043 56.0552C6.69043 56.5545 7.09566 56.9589 7.59497 56.9589H28.0979C28.5973 56.9589 29.0024 56.5545 29.0024 56.0552C29.0024 55.5559 28.5972 55.1515 28.0979 55.1515ZM58.758 6.01071C58.5979 6.07847 58.466 6.05774 58.362 5.94892C57.4948 3.38061 55.1222 1.65503 52.459 1.65503C49.28 1.65503 46.6478 4.0911 46.2633 7.22946C44.8218 7.55102 43.5882 8.56832 42.9976 9.97918C42.4828 11.2067 43.4314 12.5998 44.7535 12.5998H54.4502C55.6128 12.5998 55.6306 10.7925 54.4502 10.7925H44.7535C44.6827 10.7819 44.654 10.7436 44.6661 10.6766C45.0954 9.65242 46.07 8.96709 47.1506 8.93056C47.6375 8.91407 48.0238 8.51454 48.0238 8.02738V8.01417C48.0291 5.50312 50.0168 3.46234 52.4591 3.46234C54.3458 3.46234 56.0291 4.69354 56.6475 6.52659C56.9709 7.4821 57.8309 7.81802 58.7576 7.81802C60.3063 7.81802 61.5659 9.11697 61.5659 10.7217C61.5659 10.7579 61.5222 10.7925 61.4762 10.7925H59.5156C58.353 10.7925 58.3356 12.5998 59.5156 12.5998H61.4766C62.5205 12.5998 63.3724 11.7594 63.375 10.7266V10.7142C63.375 8.1203 61.3036 6.01071 58.758 6.01071ZM23.8888 21.174H40.6118C41.652 21.174 42.4944 20.3171 42.5103 19.2887C42.5103 16.6949 40.4388 14.5845 37.8933 14.5845C37.7339 14.6523 37.6019 14.6319 37.4972 14.5231C36.63 11.9548 34.2579 10.2296 31.5943 10.2296C28.4152 10.2296 25.783 12.6657 25.3986 15.804C23.9574 16.1252 22.7234 17.1429 22.1329 18.5535C21.6184 19.7809 22.5666 21.174 23.8888 21.174ZM40.7012 19.2964C40.7012 19.3325 40.6575 19.3667 40.6118 19.3667H23.8888C23.8183 19.3566 23.7893 19.3177 23.8014 19.251C24.2306 18.227 25.206 17.5417 26.2851 17.5048C26.5196 17.4969 26.7418 17.3983 26.9049 17.2298C27.068 17.0612 27.1591 16.836 27.1591 16.6016V16.5921C27.1625 14.0799 29.1509 12.0369 31.5943 12.0369C33.4811 12.0369 35.1642 13.2681 35.7835 15.1012C36.1065 16.0582 36.9658 16.3918 37.8933 16.3918C39.442 16.3918 40.7012 17.6912 40.7012 19.2887V19.2964Z"
                      fill="#4BAF47"
                    />
                  </svg>
                </div>
                <h3 className="process-card-title wow fadeInUp" data-wow-delay="1.7s">
                  Konstruksi
                </h3>
                <div className="checklist mb-30 mt-25">
                  <ul>
                    <li className="wow fadeInUp" data-wow-delay="1.8s">
                      <i className="fas fa-check-circle" />
                      Pengujian Material
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="1.9s">
                      <i className="fas fa-check-circle" />
                      Pengadaan Material &amp; Fabrikasi
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2s">
                      <i className="fas fa-check-circle" />
                      Pekerjaan Galian/Pit
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2.1s">
                      <i className="fas fa-check-circle" />
                      Pekerjaan Laying Cable (Opencut/Ducting/Hdd)
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2.2s">
                      <i className="fas fa-check-circle" />
                      Pekerjaan Puling Cable &amp; Jointing
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2.3s">
                      <i className="fas fa-check-circle" />
                      Pekerjaan Testcom
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2.4s">
                      <i className="fas fa-check-circle" />
                      Penerbitan Slo
                    </li>
                  </ul>
                </div>
              </div>
            </div>
             <div className="w-full md:w-1/3 lg:w-1/4 process-card-wrap mb-4"> 
              <div
                className="process-card style3 wow fadeInRight"
                data-wow-delay="2.5s"
              >
                <div className="process-card-icon">
                  <div className="process-num">03</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={80}
                    height={80}
                    viewBox="0 0 65 65"
                    fill="none"
                  >
                    <path
                      d="M13.7157 17.3311L23.7597 23.3585C24.1746 23.6076 24.7502 23.4669 25.0012 23.0474L32.6385 10.2855L37.8125 18.9293L34.6896 20.8034C33.9558 21.2437 34.2215 22.4048 35.0736 22.4814L47.7164 23.6235C47.9073 23.6408 48.0986 23.597 48.263 23.4984C48.4273 23.3998 48.5561 23.2515 48.6308 23.0749L53.5869 11.3719C53.9207 10.5834 53.0231 9.80132 52.2889 10.242L49.4237 11.9611L45.4743 5.06153C44.5603 3.4644 42.8545 2.47534 41.0229 2.47534H24.4174C22.6155 2.47534 20.9251 3.43659 20.0032 4.98861L17.7426 8.79072C17.149 9.79002 18.703 10.7178 19.2977 9.71691L21.558 5.91403C22.1553 4.90941 23.2494 4.28619 24.4174 4.28619H24.4336L27.6134 4.30203C28.5817 4.43859 29.5221 5.0792 30.0783 6.00838L31.5836 8.52358L23.9139 21.3396L15.4192 16.2416L16.6094 14.2395C17.2034 13.2401 15.6494 12.3124 15.0547 13.3133L13.4031 16.0914C13.2808 16.2974 13.245 16.5435 13.3035 16.7758C13.3621 17.0082 13.5102 17.2078 13.7156 17.3311H13.7157ZM31.0503 4.27827L40.999 4.28696H41.0171C42.2069 4.28696 43.3124 4.92718 43.9044 5.96203L48.3122 13.663C48.372 13.7675 48.452 13.859 48.5475 13.9322C48.643 14.0053 48.7522 14.0587 48.8686 14.0891C48.985 14.1195 49.1063 14.1263 49.2253 14.1092C49.3444 14.0921 49.4588 14.0513 49.562 13.9894L50.837 13.2246L47.2222 21.7606L38.0001 20.928L39.5178 20.0172C39.9464 19.7603 40.0858 19.2042 39.8288 18.7749L31.6303 5.07814C31.4608 4.79502 31.2666 4.52737 31.0503 4.27827ZM62.7239 36.2436L56.4211 24.9683C56.178 24.533 55.628 24.3765 55.1924 24.6194L53.0604 25.8059C52.045 26.3706 52.9232 27.9547 53.9393 27.3885L55.2829 26.6404L61.1451 37.1275C61.7179 38.1529 61.7066 39.4212 61.1149 40.4361L59.3074 43.5363C58.5667 44.4825 57.5721 44.718 56.8097 44.7315H53.9939L46.6268 31.4584L49.5443 29.8342C50.5597 29.2696 49.6819 27.6858 48.6651 28.2517L44.9572 30.3153C44.5208 30.5582 44.3636 31.1094 44.606 31.5467L51.9244 44.7316H41.7623L41.7032 41.0718C41.6897 40.2154 40.5517 39.8645 40.0588 40.5651L32.749 50.9582C32.6388 51.1149 32.5811 51.3026 32.5843 51.4942C32.5875 51.6858 32.6514 51.8714 32.7667 52.0244L40.41 62.1746C40.9244 62.8585 42.0506 62.4711 42.0367 61.6147L41.982 58.2695L49.9239 58.2948H49.9405C51.7816 58.2944 53.4908 57.3015 54.4002 55.7042C57.1636 50.9212 59.8964 46.118 62.6772 41.349C63.5907 39.7826 63.6084 37.8261 62.7239 36.2436ZM49.9401 56.484H49.9295L41.0658 56.4564C40.9456 56.4565 40.8265 56.4803 40.7155 56.5264C40.6044 56.5726 40.5036 56.6402 40.4187 56.7254C40.3342 56.8111 40.2677 56.9128 40.223 57.0245C40.1783 57.1363 40.1563 57.2558 40.1583 57.3762L40.1824 58.8644L34.6082 51.4619L39.9392 43.8812L39.9679 45.6521C39.9718 45.8897 40.0687 46.1162 40.238 46.2828C40.4072 46.4494 40.6351 46.5428 40.8724 46.5427H56.8319C57.104 46.5387 57.3756 46.5152 57.6444 46.4726L52.8309 54.8025C52.2399 55.8404 51.1329 56.484 49.9401 56.484ZM28.8651 45.0463C28.7098 44.8908 28.4505 44.7825 28.2251 44.7825L13.367 44.8217L18.0879 35.9214L21.3028 37.6318C22.0581 38.0341 22.9151 37.2071 22.5409 36.4364L16.99 25.0042C16.9063 24.8317 16.7701 24.6902 16.6008 24.6003C16.4316 24.5103 16.2382 24.4764 16.0485 24.5036L3.48073 26.2955C2.6336 26.4162 2.42809 27.5895 3.18375 27.9912L6.13443 29.5614L2.27246 36.5109C1.3739 38.1275 1.41356 40.1123 2.37309 41.6866C5.10099 46.2262 7.82521 50.7683 10.5569 55.3064C11.6253 57.08 13.1808 58.4056 15.3603 58.3921L20.053 58.3656C21.2138 58.3589 21.2078 56.5544 20.0433 56.5544L15.3506 56.5812C14.1735 56.5914 13.0745 55.9648 12.4734 54.9552L10.8448 52.2204C10.4612 51.3187 10.5237 50.1816 11.0318 49.2242L12.4055 46.6351L27.3251 46.5955L27.3516 56.5132L25.6589 56.5227C24.4984 56.5291 24.5045 58.3339 25.6691 58.3339L28.2635 58.3193C28.503 58.318 28.7322 58.2217 28.9009 58.0514C29.0695 57.8811 29.1637 57.6509 29.1628 57.4111L29.1324 45.6855C29.132 45.5666 29.1082 45.4489 29.0624 45.3392C29.0165 45.2295 28.9495 45.1299 28.8651 45.0462V45.0463ZM9.04969 49.2838L3.92031 40.748C3.29702 39.7253 3.27126 38.4388 3.85364 37.3915L8.16368 29.6352C8.22214 29.53 8.25907 29.4142 8.27229 29.2945C8.28552 29.1748 8.27478 29.0537 8.2407 28.9383C8.20663 28.8228 8.1499 28.7153 8.07384 28.6221C7.99778 28.5288 7.90391 28.4517 7.79771 28.3951L6.48418 27.6965L15.6509 26.3896L19.6999 34.7282L18.1384 33.8971C17.9263 33.7845 17.6783 33.7608 17.4487 33.8311C17.3351 33.8657 17.2294 33.9225 17.1378 33.9982C17.0461 34.0739 16.9703 34.1669 16.9147 34.272L9.43418 48.3755C9.27953 48.6664 9.15086 48.9704 9.04969 49.2839V49.2838Z"
                      fill="#4BAF47"
                    />
                  </svg>
                </div>
                <h3
                  className="process-card-title wow fadeInRight"
                  data-wow-delay="2.6s"
                >
                  Pemeliharaan
                </h3>
                <div className="checklist mb-30 mt-25">
                  <ul>
                    <li className="wow fadeInRight" data-wow-delay="2.7s">
                      <i className="fas fa-check-circle" />
                      Pemeliharaan Cossbounding
                    </li>
                    <li className="wow fadeInRight" data-wow-delay="2.8s">
                      <i className="fas fa-check-circle" />
                      Asessmen
                    </li>
                    <li className="wow fadeInRight" data-wow-delay="2.9s">
                      <i className="fas fa-check-circle" />
                      Pemeliharaan Jalur Sktt
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-12 text-center align-self-center wow fadeInUp"
            data-wow-delay="3s"
          >
            <a
              href="/PERENCANAAN-PENEMPATAN-JARINGAN-UTILITAS-BAWAH-TANAH-SKTT.pdf"
              className="btn style4 mt-50"
            >
              Read More Document <i className="fas fa-angle-double-right" />
            </a>
          </div>
        </div>
      </div>

      <div className="service-details-area space-top bg-smoke space-extra-bottom overflow-hidden">
        <div className="container container2">
          <div className="row gx-30 flex-row">
            <div className="col-lg-12">
              <div className="service-page-single">
                <div className="page-content">
                  <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-8">
                      <div className="title-area text-center">
                        <h2 className="sec-title wow fadeInUp" data-wow-delay=".5s">
                          Perencanaan Jaringan Sutt/Sutet
                        </h2>
                        <span className="sub-title wow fadeInUp" data-wow-delay=".6s">
                          Pembangunan Infrastrutur Ketenagalistrikkan
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Gambar di kanan, teks di kiri */}
                  <div className="flex flex-col md:flex-row items-center mb-14">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                      <h3 className="page-subtitle mb-4">Landasan Peraturan Perundang Undangan</h3>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Peraturan Presiden Republik Indonesia Nomor 4 Tahun 2016 tentang Percepatan Pembangunan Infrastruktur Ketenagalistrikan",
                          "Peraturan Pemerintah No 25 tahun 2021 tentang Penyelenggaraan bidang energi dan sumber daya mineral: Jasa lain Penungjang penyedia tenagalistrik",
                          "Peraturan mentri ESDM Nomor 6 Tahun 2021 tentang standarisasi kompetensi tenaga Teknik ketenagalistrikan",
                          "Peraturan Mentri ESDM Nomor 13 tahun 2021 tentang ruang bebas dan jarak minimum jaringan transmisi tenaga Listrik dan kompensasi atas tahan bangunan tanaman yang berada di ruang bebas transmisi tenaga Listrik"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2f4f75] flex items-center justify-center">
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
                    <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
                      <img src="/service/sutet-500kv.jpg" alt="Air Pollution" className="rounded-2xl shadow-lg transform transition duration-300 hover:scale-105" />
                    </div>
                  </div>

                  {/* Gambar di kiri, teks di kanan */}
                  <div className="flex flex-col md:flex-row-reverse items-center mb-14">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                      <h3 className="page-subtitle mb-4">Perencanaan Jaringan Tegangan Tinggi Dan Tegangan Ekstra Tinggi</h3>
                      <p>Proses penyaluran energi Listrik dari Pembangkit ke Gardu Induk dapat memalui beberapa tahapan dan terbagi atas beberapa level tegangan yaitu :</p>
                      <ul className="mt-4 space-y-2">
                        {[
                          "Tegangan Ekstra Tinggi (Extra High Voltage, EHV)",
                          "Tegangan Tinggi (High Voltage, HV)",
                          "Tegangan Menengah (Medium High Voltage, MHV)",
                          "Tegangan Rendah (Low Voltage, LV)"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2f4f75] flex items-center justify-center">
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
                      <p className="mt-4">Penyaluran/distribusi energi listrik dari gardu induk satu ke gardu induk berikutnya menggunakan konduktor yang rentangkan antara tiang-tiang (tower) pada level tegangan tinggi tersebut.</p>
                    </div>
                    <div className="md:w-1/2 md:mr-8 mt-8 md:mt-0">
                      <img src="/service/sutet.jpg" alt="Water Pollution" className="rounded-2xl shadow-lg transform transition duration-300 hover:scale-105" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="process-area-3  space-bottom overflow-hidden relative">
        <div className="absolute bottom-0 right-0">
          <img src="/process-shape1-2.png" alt="img" className="max-w-full h-auto" />
        </div>
        <div
          className=" absolute top-0 left-0 process-shape3_2 shape-mockup jump-reverse absolute top-0 left-0 z-20 d-lg-block d-none"
        >
          <img src="/service/service-shape1-2.png" alt="img" className="max-w-full h-auto" />
        </div>
        <div className="container container2 mt-4">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div className="title-area text-center">
                <span className="sub-title wow fadeInUp" data-wow-delay=".1s">
                  WORK PROCESS
                </span>
                <h2 className="sec-title wow fadeInUp" data-wow-delay=".2s">
                  Beberapa Tahapan Dalam Pembangunan Jaringan Transmisi
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-0 md:space-x-4">
            <div className="w-full md:w-1/3 lg:w-1/4 process-card-wrap">
              <div
                className="process-card style3 wow fadeInLeft"
                data-wow-delay=".3s"
              >
                <div className="process-card-icon">
                  <div className="process-num">01</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={80}
                    height={80}
                    viewBox="0 0 50 50"
                    fill="none"
                  >
                    <path
                      d="M38.7472 27.8337C40.7805 24.9762 41.855 21.6065 41.855 18.089C41.855 8.80376 34.2938 1.25 24.9996 1.25C22.7143 1.25 20.4983 1.69902 18.4121 2.58475C17.5891 2.9341 18.1253 4.21875 18.9571 3.86532C20.8698 3.05329 22.9027 2.6416 24.9996 2.6416C33.5257 2.6416 40.462 9.57118 40.462 18.089C40.462 21.3157 39.4762 24.4068 37.6117 27.0277C35.7873 29.5923 33.2668 31.5176 30.3233 32.5961C30.1895 32.6453 30.074 32.7344 29.9925 32.8512C29.9109 32.9681 29.8672 33.1071 29.8672 33.2496V34.7348L25.6966 34.9815V28.7037L27.7864 26.7543C28.7467 26.7256 31.8463 26.4705 33.8957 24.4231C36.2942 22.0266 36.2359 18.1921 36.2324 18.0301C36.2284 17.851 36.1554 17.6803 36.0287 17.5536C35.902 17.4269 35.7312 17.3538 35.5519 17.3497C35.3896 17.346 31.5515 17.2879 29.1524 19.6844C27.1282 21.7065 26.854 24.753 26.8197 25.7524L25.6966 26.7998V20.0949C26.0426 19.725 26.7431 18.9124 27.3371 17.8173C27.7638 17.0319 26.54 16.3674 26.1131 17.1543C25.7677 17.79 25.3777 18.3191 25.0693 18.6955C25.0466 18.6931 25.0234 18.6917 25.0002 18.6917C24.977 18.6917 24.9537 18.6932 24.9311 18.6954C24.2103 17.8141 23.039 16.0833 23.039 14.144C23.039 12.1404 24.2898 10.3592 25.0007 9.50832C25.7129 10.3566 26.9608 12.1317 26.9608 14.144C26.9608 14.3052 26.9526 14.4702 26.9364 14.6343C26.849 15.5232 28.235 15.6612 28.323 14.7706C28.3434 14.5624 28.3537 14.3533 28.3537 14.144C28.3537 10.7552 25.5986 8.0848 25.481 7.97288C25.3515 7.8491 25.1791 7.78002 24.9999 7.78002C24.8206 7.78002 24.6483 7.8491 24.5187 7.97288C24.4012 8.0848 21.646 10.7549 21.646 14.144C21.646 17.0221 23.6324 19.3809 24.3037 20.0958V26.7969L23.1792 25.7445C23.1438 24.7373 22.8658 21.7013 20.8465 19.6841C18.4477 17.2876 14.609 17.3456 14.4474 17.3497C14.2681 17.3538 14.0974 17.4268 13.9706 17.5534C13.8439 17.6801 13.7709 17.8507 13.7669 18.0298C13.7631 18.1916 13.7047 22.0261 16.1032 24.4228C18.1593 26.4768 21.2711 26.7273 22.2209 26.7543L24.3037 28.7037V35.0636L20.1324 35.3109V33.2493C20.1323 33.1068 20.0884 32.9678 20.0068 32.851C19.9251 32.7342 19.8095 32.6452 19.6756 32.5961C16.7323 31.5176 14.2122 29.592 12.3875 27.0271C10.5229 24.4062 9.53745 21.3154 9.53745 18.0887C9.53745 15.6093 10.1074 13.2415 11.2311 11.0516C12.3039 8.96155 13.8695 7.1118 15.7582 5.70283C16.4822 5.16244 15.6403 4.05465 14.9247 4.58754C12.8663 6.1232 11.1608 8.13869 9.99159 10.4166C8.76578 12.805 8.14448 15.3863 8.14448 18.0886C8.14448 21.6062 9.21911 24.9757 11.2519 27.8331C13.1455 30.4946 15.7268 32.5248 18.7394 33.7277V35.3932C15.7761 35.4573 15.7329 39.9873 18.7394 39.9191V41.6862C15.656 41.7868 15.9032 46.4179 19.0244 46.1975C19.6178 47.6912 21.0781 48.75 22.7816 48.75H27.2176C29.1843 48.75 30.8265 47.3395 31.1861 45.478L32.1725 45.4194C35.0696 45.2475 34.8354 40.7344 31.9046 40.9072L31.2598 40.9452V39.2778C31.2598 39.2451 31.2583 39.2129 31.2572 39.1805L32.1725 39.1265C35.0661 38.9554 34.8418 34.4403 31.9046 34.614L31.2598 34.6519V33.728C34.2727 32.5248 36.854 30.4951 38.7472 27.8337ZM30.1376 20.6684C31.5558 19.2512 33.701 18.8755 34.8064 18.7761C34.7088 19.8789 34.3351 22.0162 32.9111 23.4388C31.4925 24.8556 29.3477 25.2316 28.2423 25.3308C28.3395 24.2283 28.7133 22.091 30.1376 20.6684ZM15.1947 18.7766C16.3009 18.8758 18.4445 19.2524 19.8616 20.6684C21.238 22.0431 21.633 24.1018 21.7459 25.2319C21.7222 25.2509 21.6998 25.2715 21.6788 25.2934C21.6701 25.303 21.6623 25.3131 21.6541 25.323C20.5247 25.2119 18.4701 24.8196 17.0882 23.4388C15.6708 22.0226 15.2945 19.8812 15.1947 18.7766ZM32.0398 36.0017C33.1267 36.0017 33.1759 37.6729 32.0897 37.7372L18.7419 38.5276C18.502 38.5426 18.2727 38.4594 18.0968 38.2956C18.0104 38.2155 17.9413 38.1186 17.8938 38.0108C17.8463 37.903 17.8215 37.7866 17.8209 37.6688C17.8187 37.4459 17.9024 37.2307 18.0547 37.0677C18.207 36.9048 18.4161 36.8066 18.6389 36.7935L31.987 36.0029C32.0048 36.002 32.0225 36.0017 32.0399 36.0017H32.0398ZM32.6318 42.5284C33.1756 43.0358 32.8317 43.9863 32.09 44.0301L28.7658 44.227C27.8734 44.2797 27.9543 45.6682 28.8484 45.6163L29.7249 45.5644C29.3691 46.6064 28.3798 47.3584 27.2175 47.3584H22.7816C21.8334 47.3584 21.0011 46.8583 20.5328 46.1089L25.6908 45.8033C26.5834 45.7505 26.5022 44.3638 25.6084 44.4143L18.7419 44.821C17.6224 44.8885 17.5216 43.1529 18.6389 43.0867L31.987 42.2965C32.1046 42.289 32.2225 42.3057 32.3335 42.3456C32.4444 42.3855 32.5459 42.4477 32.6318 42.5284ZM20.1324 41.6039V39.8393L29.8662 39.2633C29.8662 39.2679 29.8668 39.2729 29.8668 39.2778V41.0277L20.1324 41.6039ZM10.8872 5.39118C11.5088 6.02664 12.5065 5.05631 11.884 4.41877L9.15871 1.63096C8.53422 0.991719 7.53648 1.96287 8.16216 2.6033L10.8872 5.39118ZM4.65769 7.4443L8.0121 9.43291C8.77537 9.88491 9.49621 8.69444 8.72306 8.23643L5.36844 6.24759C4.59937 5.79189 3.88722 6.9877 4.65769 7.4443ZM2.5265 13.0267L6.28222 14.0802C7.14177 14.3211 7.5214 12.9823 6.65866 12.7405L2.90315 11.6869C2.04182 11.4457 1.66427 12.7852 2.5265 13.0266V13.0267ZM5.8231 19.0167C6.71237 19.0167 6.72218 17.6358 5.83157 17.6251L1.93098 17.5787C1.03918 17.5505 1.01251 18.9596 1.91471 18.97L5.815 19.0164C5.81797 19.0167 5.82072 19.0167 5.8231 19.0167ZM7.14504 23.0593C7.1225 22.9708 7.08271 22.8875 7.02794 22.8143C6.97317 22.7412 6.90449 22.6795 6.82584 22.6328C6.74718 22.5862 6.66009 22.5555 6.56956 22.5425C6.47902 22.5295 6.38681 22.5345 6.29819 22.5572L2.51862 23.5211C1.65209 23.7418 1.99658 25.0905 2.86311 24.8692L6.64268 23.9056C7.01533 23.8108 7.24021 23.4315 7.14504 23.0593ZM8.97476 27.4666C8.78666 27.1315 8.36186 27.0124 8.02666 27.2004L4.62552 29.1084C3.84457 29.547 4.53117 30.7577 5.30752 30.3217L8.70858 28.4138C9.04408 28.2256 9.16309 27.8018 8.97469 27.4666H8.97476Z"
                      fill="#4BAF47"
                    />
                    <path
                      d="M10.8997 31.239L8.10858 33.9616C7.47732 34.5774 8.43732 35.5857 9.08187 34.9571L11.8725 32.2348C12.5126 31.6106 11.5402 30.6136 10.8997 31.239ZM39.1121 31.2509C38.4876 30.6113 37.4899 31.5828 38.1156 32.2227L40.8406 35.0111C41.4621 35.6471 42.4604 34.6762 41.8374 34.0393L39.1121 31.2509ZM45.3421 29.1977L41.9874 27.2091C41.2184 26.7537 40.5062 27.9492 41.2767 28.4055L44.6312 30.3942C45.3944 30.8464 46.1149 29.656 45.3421 29.1977ZM47.4728 23.6147L43.7173 22.5618C42.8566 22.32 42.4784 23.6596 43.3406 23.9014L47.0964 24.9544C47.9563 25.196 48.3356 23.8567 47.4728 23.6147ZM48.0848 17.6717L44.1845 17.6253C43.2927 17.5971 43.2661 19.0062 44.1677 19.0166L48.0686 19.063C48.96 19.0915 48.9871 17.6824 48.0848 17.6717ZM42.8543 13.5827C42.9468 13.9451 43.3401 14.1771 43.7013 14.0849L47.4809 13.1209C48.3474 12.9003 48.0041 11.5507 47.1364 11.7727L43.3565 12.7365C42.9843 12.8313 42.7593 13.2099 42.8543 13.5827ZM41.0245 9.17539C41.2082 9.50158 41.6484 9.6233 41.9732 9.44094L45.3741 7.533C46.1538 7.09556 45.473 5.88193 44.6921 6.31975L41.291 8.22828C40.9557 8.41643 40.8362 8.84029 41.0245 9.17539ZM38.6139 5.60131C38.7894 5.60131 38.965 5.53526 39.1005 5.403L41.8911 2.68065C42.5309 2.05618 41.5588 1.05949 40.9183 1.68479L38.1272 4.40743C37.6924 4.83129 37.9966 5.60131 38.6139 5.60131Z"
                      fill="#4BAF47"
                    />
                  </svg>
                </div>
                <h3
                  className="process-card-title wow fadeInLeft"
                  data-wow-delay=".4s"
                >
                  Perencanaan
                </h3>
                <div className="checklist mb-30 mt-25">
                  <ul>
                    <li className="wow fadeInLeft" data-wow-delay=".5s">
                      <i className="fas fa-check-circle" />
                      Study Desktop
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay=".6s">
                      <i className="fas fa-check-circle" />
                      Survey dan Pengukuran
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay=".7s">
                      <i className="fas fa-check-circle" />
                      Perencanaan Tower Schedulle
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay=".8s">
                      <i className="fas fa-check-circle" />
                      Perencanaan Longprofile
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay=".9s">
                      <i className="fas fa-check-circle" />
                      Perencanaan Pondasi
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1s">
                      <i className="fas fa-check-circle" />
                      Perencanaan Tower
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1.1s">
                      <i className="fas fa-check-circle" />
                      Perijinan Lokasi
                    </li>
                    <li className="wow fadeInLeft" data-wow-delay="1.2s">
                      <i className="fas fa-check-circle" />
                      Pembebasan Lahan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 process-card-wrap mb-6">
              <div className="process-card style3 wow fadeInUp" data-wow-delay="1.3s">
                <div className="process-card-icon">
                  <div className="process-num">02</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={80}
                    height={80}
                    viewBox="0 0 65 65"
                    fill="none"
                  >
                    <path
                      d="M62.4705 24.8288H51.3748C51.256 24.8287 51.1383 24.8521 51.0286 24.8975C50.9188 24.9429 50.8191 25.0095 50.7351 25.0934C50.6511 25.1773 50.5844 25.2769 50.539 25.3866C50.4935 25.4962 50.4702 25.6138 50.4702 25.7324V30.8735H43.7163V25.7324C43.7164 25.6138 43.693 25.4962 43.6476 25.3865C43.6021 25.2769 43.5355 25.1772 43.4515 25.0933C43.3675 25.0094 43.2678 24.9428 43.158 24.8974C43.0482 24.8521 42.9306 24.8287 42.8118 24.8288H31.7161C31.4762 24.8288 31.2461 24.924 31.0765 25.0935C30.9068 25.2629 30.8115 25.4928 30.8115 25.7324V36.41L19.8063 47.683H18.3183L15.3869 23.0165C15.3608 22.7967 15.2549 22.5941 15.0893 22.4471C14.9237 22.3001 14.7098 22.219 14.4883 22.219H12.3589V19.2355C13.8287 19.1556 16.5816 18.7422 18.4396 16.8626C21.0247 14.2476 20.7481 9.93526 20.735 9.75346C20.7194 9.53469 20.6247 9.32904 20.4685 9.17489C20.3123 9.02073 20.1054 8.92859 19.8862 8.91564C19.7731 8.90928 18.0797 8.82224 16.1926 9.37349C15.6277 5.17301 12.0404 2.01854 11.8761 1.87579C11.7102 1.73212 11.4976 1.65366 11.2781 1.65505C11.0585 1.65643 10.8469 1.73756 10.6829 1.88331C10.5065 2.03965 6.36701 5.76918 6.39596 10.4848C6.42201 14.6092 9.62741 17.9396 10.5497 18.8131V22.2195H8.22887C8.00743 22.2194 7.79365 22.3005 7.62811 22.4475C7.46257 22.5944 7.35677 22.7969 7.3308 23.0166L6.30227 31.6709C6.16546 32.8232 7.96171 33.0381 8.09881 31.8841L8.32883 29.9495H14.3892L16.4964 47.6831H6.22123L7.5833 36.2216C7.72011 35.068 5.92608 34.8375 5.78666 36.0086L4.3997 47.683H2.52954C2.03014 47.683 1.625 48.0877 1.625 48.5866V62.4412C1.625 62.9405 2.03023 63.3448 2.52954 63.3448H62.4705C62.5893 63.3449 62.7069 63.3216 62.8167 63.2762C62.9265 63.2308 63.0262 63.1642 63.1102 63.0803C63.1942 62.9964 63.2608 62.8967 63.3063 62.7871C63.3517 62.6774 63.3751 62.5599 63.375 62.4412V53.224C63.375 52.0639 61.5659 52.062 61.5659 53.224V61.5376H3.43408V49.4904H20.1881C20.3087 49.4904 20.4281 49.4662 20.5393 49.4194C20.6504 49.3726 20.751 49.304 20.8352 49.2177L32.3636 37.4081C32.5284 37.2394 32.6206 37.0131 32.6206 36.7774V26.6362H41.9072V36.7774C41.9072 36.8961 41.9306 37.0136 41.976 37.1233C42.0215 37.2329 42.0881 37.3325 42.1721 37.4165C42.2561 37.5004 42.3558 37.5669 42.4656 37.6123C42.5753 37.6577 42.693 37.6811 42.8118 37.6811H51.3748C51.4936 37.6811 51.6112 37.6578 51.721 37.6124C51.8308 37.567 51.9305 37.5004 52.0145 37.4165C52.0985 37.3326 52.1651 37.233 52.2106 37.1233C52.256 37.0136 52.2794 36.8961 52.2793 36.7774V26.6362H61.5659V48.5249C61.5659 49.685 63.375 49.6869 63.375 48.5249V25.7325C63.3751 25.6138 63.3517 25.4963 63.3063 25.3866C63.2608 25.277 63.1942 25.1773 63.1102 25.0934C63.0262 25.0095 62.9265 24.9429 62.8167 24.8975C62.7069 24.8521 62.5893 24.8287 62.4705 24.8288ZM43.7163 32.6808H50.4702V35.8737H43.7163V32.6808ZM13.6852 24.0264L14.1743 28.1423H8.54283L9.0324 24.0264H13.6852ZM18.927 10.7342C18.869 11.944 18.5603 14.1689 17.1526 15.5926C15.7441 17.0177 13.5193 17.3536 12.3099 17.4259C12.3265 17.0787 12.3642 16.6461 12.4437 16.1686C12.6216 15.1042 13.0505 13.615 14.0861 12.5672C15.4939 11.1432 17.7171 10.8069 18.927 10.7342ZM12.7991 11.2975C11.3692 12.7438 10.8154 14.7085 10.6079 16.2071C9.53517 14.8855 8.2199 12.795 8.20514 10.4733C8.18671 7.55683 10.2461 4.96066 11.2916 3.83145C12.308 4.90234 14.2724 7.31094 14.4469 10.0798C13.8615 10.3947 13.2974 10.793 12.7991 11.2975Z"
                      fill="#4BAF47"
                    />
                    <path
                      d="M38.436 43.1988H34.5747C34.3348 43.1988 34.1048 43.294 33.9352 43.4635C33.7655 43.633 33.6703 43.8628 33.6703 44.1024V56.0142C33.6703 56.5139 34.0755 56.9179 34.5748 56.9179H38.4361C38.5549 56.918 38.6726 56.8947 38.7823 56.8493C38.8921 56.8039 38.9919 56.7373 39.0759 56.6534C39.1599 56.5695 39.2265 56.4698 39.2719 56.3602C39.3173 56.2505 39.3407 56.1329 39.3405 56.0142V44.1024C39.3405 43.6035 38.9354 43.1988 38.436 43.1988ZM37.5315 55.1105H35.4792V45.0061H37.5315V55.1105ZM47.4822 43.1988H43.6209C43.381 43.1988 43.151 43.294 42.9813 43.4635C42.8117 43.633 42.7164 43.8628 42.7164 44.1024V56.0142C42.7164 56.5139 43.1216 56.9179 43.621 56.9179H47.4823C47.6011 56.9179 47.7187 56.8946 47.8285 56.8492C47.9382 56.8038 48.0379 56.7372 48.1219 56.6533C48.2059 56.5694 48.2725 56.4697 48.318 56.3601C48.3634 56.2504 48.3868 56.1329 48.3867 56.0142V44.1024C48.3867 43.6035 47.9816 43.1988 47.4822 43.1988ZM46.5777 55.1105H44.5254V45.0061H46.5777V55.1105ZM56.528 43.1988H52.6667C52.4268 43.1988 52.1968 43.294 52.0271 43.4635C51.8575 43.633 51.7622 43.8628 51.7622 44.1024V56.0142C51.7622 56.5139 52.1674 56.9179 52.6668 56.9179H56.5281C56.6469 56.9179 56.7645 56.8946 56.8742 56.8492C56.984 56.8038 57.0837 56.7372 57.1677 56.6533C57.2517 56.5694 57.3183 56.4697 57.3638 56.3601C57.4092 56.2504 57.4326 56.1329 57.4325 56.0142V44.1024C57.4325 43.6035 57.0274 43.1988 56.528 43.1988ZM55.6234 55.1105H53.5712V45.0061H55.6234V55.1105ZM28.0979 55.1515H7.59497C7.09557 55.1515 6.69043 55.5559 6.69043 56.0552C6.69043 56.5545 7.09566 56.9589 7.59497 56.9589H28.0979C28.5973 56.9589 29.0024 56.5545 29.0024 56.0552C29.0024 55.5559 28.5972 55.1515 28.0979 55.1515ZM58.758 6.01071C58.5979 6.07847 58.466 6.05774 58.362 5.94892C57.4948 3.38061 55.1222 1.65503 52.459 1.65503C49.28 1.65503 46.6478 4.0911 46.2633 7.22946C44.8218 7.55102 43.5882 8.56832 42.9976 9.97918C42.4828 11.2067 43.4314 12.5998 44.7535 12.5998H54.4502C55.6128 12.5998 55.6306 10.7925 54.4502 10.7925H44.7535C44.6827 10.7819 44.654 10.7436 44.6661 10.6766C45.0954 9.65242 46.07 8.96709 47.1506 8.93056C47.6375 8.91407 48.0238 8.51454 48.0238 8.02738V8.01417C48.0291 5.50312 50.0168 3.46234 52.4591 3.46234C54.3458 3.46234 56.0291 4.69354 56.6475 6.52659C56.9709 7.4821 57.8309 7.81802 58.7576 7.81802C60.3063 7.81802 61.5659 9.11697 61.5659 10.7217C61.5659 10.7579 61.5222 10.7925 61.4762 10.7925H59.5156C58.353 10.7925 58.3356 12.5998 59.5156 12.5998H61.4766C62.5205 12.5998 63.3724 11.7594 63.375 10.7266V10.7142C63.375 8.1203 61.3036 6.01071 58.758 6.01071ZM23.8888 21.174H40.6118C41.652 21.174 42.4944 20.3171 42.5103 19.2887C42.5103 16.6949 40.4388 14.5845 37.8933 14.5845C37.7339 14.6523 37.6019 14.6319 37.4972 14.5231C36.63 11.9548 34.2579 10.2296 31.5943 10.2296C28.4152 10.2296 25.783 12.6657 25.3986 15.804C23.9574 16.1252 22.7234 17.1429 22.1329 18.5535C21.6184 19.7809 22.5666 21.174 23.8888 21.174ZM40.7012 19.2964C40.7012 19.3325 40.6575 19.3667 40.6118 19.3667H23.8888C23.8183 19.3566 23.7893 19.3177 23.8014 19.251C24.2306 18.227 25.206 17.5417 26.2851 17.5048C26.5196 17.4969 26.7418 17.3983 26.9049 17.2298C27.068 17.0612 27.1591 16.836 27.1591 16.6016V16.5921C27.1625 14.0799 29.1509 12.0369 31.5943 12.0369C33.4811 12.0369 35.1642 13.2681 35.7835 15.1012C36.1065 16.0582 36.9658 16.3918 37.8933 16.3918C39.442 16.3918 40.7012 17.6912 40.7012 19.2887V19.2964Z"
                      fill="#4BAF47"
                    />
                  </svg>
                </div>
                <h3 className="process-card-title wow fadeInUp" data-wow-delay="1.4s">
                  Konstruksi
                </h3>
                <div className="checklist mb-30 mt-25">
                  <ul>
                    <li className="wow fadeInUp" data-wow-delay="1.5s">
                      <i className="fas fa-check-circle" />
                      Pengujian Material
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="1.6s">
                      <i className="fas fa-check-circle" />
                      Pengadaan Material &amp; Fabrikasi
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="1.7s">
                      <i className="fas fa-check-circle" />
                      Pekerjaan Pondasi Tower
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="1.8s">
                      <i className="fas fa-check-circle" />
                      Pekerjaan Erection Tower
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="1.9s">
                      <i className="fas fa-check-circle" />
                      Pembebasan Row
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2s">
                      <i className="fas fa-check-circle" />
                      Pekerjaan Stringing &amp; Sagging
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2.1s">
                      <i className="fas fa-check-circle" />
                      Pekerjaan Komissioning
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2.2s">
                      <i className="fas fa-check-circle" />
                      Penerbitan Rlb
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="2.3s">
                      <i className="fas fa-check-circle" />
                      Penerbitan Slo (Jika Terkait Dengan Gardu Induk)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 process-card-wrap">
              <div
                className="process-card style3 wow fadeInRight"
                data-wow-delay="2.4s"
              >
                <div className="process-card-icon">
                  <div className="process-num">03</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={80}
                    height={80}
                    viewBox="0 0 65 65"
                    fill="none"
                  >
                    <path
                      d="M13.7157 17.3311L23.7597 23.3585C24.1746 23.6076 24.7502 23.4669 25.0012 23.0474L32.6385 10.2855L37.8125 18.9293L34.6896 20.8034C33.9558 21.2437 34.2215 22.4048 35.0736 22.4814L47.7164 23.6235C47.9073 23.6408 48.0986 23.597 48.263 23.4984C48.4273 23.3998 48.5561 23.2515 48.6308 23.0749L53.5869 11.3719C53.9207 10.5834 53.0231 9.80132 52.2889 10.242L49.4237 11.9611L45.4743 5.06153C44.5603 3.4644 42.8545 2.47534 41.0229 2.47534H24.4174C22.6155 2.47534 20.9251 3.43659 20.0032 4.98861L17.7426 8.79072C17.149 9.79002 18.703 10.7178 19.2977 9.71691L21.558 5.91403C22.1553 4.90941 23.2494 4.28619 24.4174 4.28619H24.4336L27.6134 4.30203C28.5817 4.43859 29.5221 5.0792 30.0783 6.00838L31.5836 8.52358L23.9139 21.3396L15.4192 16.2416L16.6094 14.2395C17.2034 13.2401 15.6494 12.3124 15.0547 13.3133L13.4031 16.0914C13.2808 16.2974 13.245 16.5435 13.3035 16.7758C13.3621 17.0082 13.5102 17.2078 13.7156 17.3311H13.7157ZM31.0503 4.27827L40.999 4.28696H41.0171C42.2069 4.28696 43.3124 4.92718 43.9044 5.96203L48.3122 13.663C48.372 13.7675 48.452 13.859 48.5475 13.9322C48.643 14.0053 48.7522 14.0587 48.8686 14.0891C48.985 14.1195 49.1063 14.1263 49.2253 14.1092C49.3444 14.0921 49.4588 14.0513 49.562 13.9894L50.837 13.2246L47.2222 21.7606L38.0001 20.928L39.5178 20.0172C39.9464 19.7603 40.0858 19.2042 39.8288 18.7749L31.6303 5.07814C31.4608 4.79502 31.2666 4.52737 31.0503 4.27827ZM62.7239 36.2436L56.4211 24.9683C56.178 24.533 55.628 24.3765 55.1924 24.6194L53.0604 25.8059C52.045 26.3706 52.9232 27.9547 53.9393 27.3885L55.2829 26.6404L61.1451 37.1275C61.7179 38.1529 61.7066 39.4212 61.1149 40.4361L59.3074 43.5363C58.5667 44.4825 57.5721 44.718 56.8097 44.7315H53.9939L46.6268 31.4584L49.5443 29.8342C50.5597 29.2696 49.6819 27.6858 48.6651 28.2517L44.9572 30.3153C44.5208 30.5582 44.3636 31.1094 44.606 31.5467L51.9244 44.7316H41.7623L41.7032 41.0718C41.6897 40.2154 40.5517 39.8645 40.0588 40.5651L32.749 50.9582C32.6388 51.1149 32.5811 51.3026 32.5843 51.4942C32.5875 51.6858 32.6514 51.8714 32.7667 52.0244L40.41 62.1746C40.9244 62.8585 42.0506 62.4711 42.0367 61.6147L41.982 58.2695L49.9239 58.2948H49.9405C51.7816 58.2944 53.4908 57.3015 54.4002 55.7042C57.1636 50.9212 59.8964 46.118 62.6772 41.349C63.5907 39.7826 63.6084 37.8261 62.7239 36.2436ZM49.9401 56.484H49.9295L41.0658 56.4564C40.9456 56.4565 40.8265 56.4803 40.7155 56.5264C40.6044 56.5726 40.5036 56.6402 40.4187 56.7254C40.3342 56.8111 40.2677 56.9128 40.223 57.0245C40.1783 57.1363 40.1563 57.2558 40.1583 57.3762L40.1824 58.8644L34.6082 51.4619L39.9392 43.8812L39.9679 45.6521C39.9718 45.8897 40.0687 46.1162 40.238 46.2828C40.4072 46.4494 40.6351 46.5428 40.8724 46.5427H56.8319C57.104 46.5387 57.3756 46.5152 57.6444 46.4726L52.8309 54.8025C52.2399 55.8404 51.1329 56.484 49.9401 56.484ZM28.8651 45.0463C28.7098 44.8908 28.4505 44.7825 28.2251 44.7825L13.367 44.8217L18.0879 35.9214L21.3028 37.6318C22.0581 38.0341 22.9151 37.2071 22.5409 36.4364L16.99 25.0042C16.9063 24.8317 16.7701 24.6902 16.6008 24.6003C16.4316 24.5103 16.2382 24.4764 16.0485 24.5036L3.48073 26.2955C2.6336 26.4162 2.42809 27.5895 3.18375 27.9912L6.13443 29.5614L2.27246 36.5109C1.3739 38.1275 1.41356 40.1123 2.37309 41.6866C5.10099 46.2262 7.82521 50.7683 10.5569 55.3064C11.6253 57.08 13.1808 58.4056 15.3603 58.3921L20.053 58.3656C21.2138 58.3589 21.2078 56.5544 20.0433 56.5544L15.3506 56.5812C14.1735 56.5914 13.0745 55.9648 12.4734 54.9552L10.8448 52.2204C10.4612 51.3187 10.5237 50.1816 11.0318 49.2242L12.4055 46.6351L27.3251 46.5955L27.3516 56.5132L25.6589 56.5227C24.4984 56.5291 24.5045 58.3339 25.6691 58.3339L28.2635 58.3193C28.503 58.318 28.7322 58.2217 28.9009 58.0514C29.0695 57.8811 29.1637 57.6509 29.1628 57.4111L29.1324 45.6855C29.132 45.5666 29.1082 45.4489 29.0624 45.3392C29.0165 45.2295 28.9495 45.1299 28.8651 45.0462V45.0463ZM9.04969 49.2838L3.92031 40.748C3.29702 39.7253 3.27126 38.4388 3.85364 37.3915L8.16368 29.6352C8.22214 29.53 8.25907 29.4142 8.27229 29.2945C8.28552 29.1748 8.27478 29.0537 8.2407 28.9383C8.20663 28.8228 8.1499 28.7153 8.07384 28.6221C7.99778 28.5288 7.90391 28.4517 7.79771 28.3951L6.48418 27.6965L15.6509 26.3896L19.6999 34.7282L18.1384 33.8971C17.9263 33.7845 17.6783 33.7608 17.4487 33.8311C17.3351 33.8657 17.2294 33.9225 17.1378 33.9982C17.0461 34.0739 16.9703 34.1669 16.9147 34.272L9.43418 48.3755C9.27953 48.6664 9.15086 48.9704 9.04969 49.2839V49.2838Z"
                      fill="#4BAF47"
                    />
                  </svg>
                </div>
                <h3
                  className="process-card-title wow fadeInRight"
                  data-wow-delay="2.5s"
                >
                  Pemeliharaan
                </h3>
                <div className="checklist mb-30 mt-25">
                  <ul>
                    <li className="wow fadeInRight" data-wow-delay="2.6s">
                      <i className="fas fa-check-circle" />
                      Pemeliharaan Konduktor &amp; Acc
                    </li>
                    <li className="wow fadeInRight" data-wow-delay="2.7s">
                      <i className="fas fa-check-circle" />
                      Pemeliharaan Tower Transmisi
                    </li>
                    <li className="wow fadeInRight" data-wow-delay="2.8s">
                      <i className="fas fa-check-circle" />
                      Pemeliharaan Pondasi
                    </li>
                    <li className="wow fadeInRight" data-wow-delay="2.9s">
                      <i className="fas fa-check-circle" />
                      Asessmen
                    </li>
                    <li className="wow fadeInRight" data-wow-delay="3s">
                      <i className="fas fa-check-circle" />
                      Pemeliharaan Jalur Row
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-12 text-center align-self-center wow fadeInUp"
            data-wow-delay="1s"
          >
            <a
              href="/Perencanaan-Jaringan-SUTT-SUTET-KPII.pdf"
              className="btn style4 mt-50"
            >
              Read More Document <i className="fas fa-angle-double-right" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}