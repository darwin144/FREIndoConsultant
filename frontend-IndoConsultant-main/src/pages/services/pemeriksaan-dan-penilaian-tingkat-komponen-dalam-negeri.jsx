import React, { useEffect, useRef, useState } from 'react';

export default function PemeriksaanDanPenilaianTingkatKomponenDalamNegeri() {
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
                  Pemeriksaan dan Penilaian Tingkat Komponen Dalam Negeri (TKDN)
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div >
      <div
        ref={sectionRef}
        className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="max-w-xl mb-6" style={fadeInStyle(0.4)}>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Kompetensi
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Pendamping self assessment TKDN merupakan tenaga ahli terlatih dan berpengalaman dengan latar belakang dari berbagai disiplin ilmu.
              </p>
            </div>
            <div className="grid gap-5 row-gap-8 sm:grid-cols-2" style={fadeInStyle(0.6)}>
              <div className="bg-white border-l-4 shadow-lg border-purple-500 rounded-lg overflow-hidden" style={fadeInStyle(0.8)}>
                <div className="p-6 border-l border-gray-100 rounded-r">
                  <h6 className="mb-4 text-lg font-bold text-purple-600">
                    Kami memberikan layanan self-assessment Tingkat Komponen Dalam Negeri (TKDN) meliputi:
                  </h6>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Produk Elektronika dan Telematika
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Produk Telepon Seluler, Komputer Genggam, dan Komputer Tablet
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Produk Alat Kesehatan dan Alat Kesehatan Diagnostik In Vitro
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Produk Logam dan Barang Logam
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Produk Bahan Bangunan
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Bahan Kimia dan Barang Kimia
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Barang Teknik Lainnya
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white border-l-4 shadow-lg border-purple-500 rounded-lg overflow-hidden" style={fadeInStyle(1)}>
                <div className="p-6 border-l border-gray-100 rounded-r">
                  <h6 className="mb-4 text-lg font-bold text-purple-600">
                    Benefit Self Assessment TKDN
                  </h6>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Memberikan kemampuan dan pengalaman kepada industri dalam melaksanakan perhitungan TKDN
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Memberi kemampuan pada industri dalam memanajemen capaian TKDN sesuai target yang ditetapkan
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-purple-500">•</span> Membantu Lembaga Verifikasi Independen dalam melaksanakan perhitungan TKDN
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center" style={fadeInStyle(1.4)}>
            <img
              className="object-cover w-full h-80 rounded-lg shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 lg:h-[28rem]"
              src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
              alt="Ilustrasi TKDN"
            />
          </div>
        </div>
      </div>
    </>
  );
}
