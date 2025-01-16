import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { BASE_URL, fetchCarousels, fetchOutput, fetchPortfolios, fetchRuangLingkup } from '@/store/actionCreators';

const MainPortofolio = () => {
  const dispatch = useDispatch();
  const portfolios = useSelector((state) => state.portfolios.portfolios);
  const filterport = portfolios.filter((p) => p.divisi === "Main Portfolio");
  const ruangLingkup = useSelector((state) => state.ruangLingkup.ruangLingkup);
  const output = useSelector((state) => state.output.output);
  const carousels = useSelector((state) => state.carousels.carousels);
  const [selectedProject, setSelectedProject] = useState(null);

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

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const ruangLingkupIsi = ruangLingkup.filter(
    (item) => item.PortfolioId === selectedProject?.id
  );
  const filteredCarousels = carousels.filter(
    (item) => item.PortfolioId === selectedProject?.id
  );
  const filteredOutput = output.filter(
    (item) => item.PortfolioId === selectedProject?.id
  );

  useEffect(() => {
    dispatch(fetchPortfolios());
    dispatch(fetchRuangLingkup());
    dispatch(fetchOutput());
    dispatch(fetchCarousels());
  }, [dispatch]);

  useEffect(() => {
    if (filterport.length > 0) {
      setSelectedProject(filterport[0]);
    }
  }, [portfolios]);

  console.log(selectedProject, 'ini');

  return (
    <div
      ref={sectionRef}
      className="project-area-4 space overflow-hidden">
      <div className="container container2">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="title-area text-center">
              <span className="sub-title wow fadeInUp" data-wow-delay=".3s" style={fadeInStyle(0.4)}>
                Portfolio
              </span>
              <h2 className="sec-title wow fadeInUp" data-wow-delay=".4s" style={fadeInStyle(0.5)}>
                Survey and Mapping
              </h2>
              <h2 className="sec-title wow fadeInUp" data-wow-delay=".4s" style={fadeInStyle(0.6)}>
                Division
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="project-wrap wow fadeInUp" data-wow-delay=".5s">
              <div className="project-tab-btn style3 filter-menu-active text-center" style={fadeInStyle(0.6)}>
                {filterport.slice(0, 3).map((button, index) => (
                  <button key={button.id}
                    onClick={() => handleProjectClick(button)}
                    data-filter={button.filter} type="button" className="mb-2">
                    <img src={BASE_URL + button.gambar} alt={button.altText} className="w-full rounded-lg shadow-lg" />
                  </button>
                ))}
              </div>
              <div className="row filter-active-cat1 gy-4">
                <div className="col-xl-6 filter-item cat1">
                  <div className="project-card style3 mx-auto" style={{ maxWidth: '900px', ...fadeInStyle(0.6) }}>
                    {/* Setting maximum width and centering the box */}
                    <div className="flex flex-col md:flex-row"> {/* Switch to column layout on smaller screens */}
                      {/* Left div */}
                      <div className="w-full md:w-1/2 p-4">
                        <div className="space-y-4">
                          <h4 className="text-lg font-bold">{selectedProject?.judul}</h4>
                          <p>{selectedProject?.isi}</p>
                          <h4 className="text-lg font-bold">Lingkup Pekerjaan</h4>
                          {selectedProject?.lingkupPekerjaan ? (
                            <li>{selectedProject.lingkupPekerjaan}</li>
                          ) : (
                            ruangLingkupIsi.map((item, index) => <li key={index}>{item.isi}</li>)
                          )}
                        </div>
                        <h4 className="text-lg font-bold mb-2 mt-2">Output</h4>
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/2 space-y-2">
                            <ul className="list-disc pl-5">
                              {filteredOutput.map((item, index) => {
                                if (index < 2) {
                                  return <li key={index}>{item.isi}</li>;
                                } else {
                                  return null; // Hide if index is greater than 1 on the left
                                }
                              })}
                            </ul>
                          </div>
                          <div className="w-full md:w-1/2 space-y-2">
                            <ul className="list-disc pl-5">
                              {filteredOutput.map((item, index) => {
                                if (index >= 2) {
                                  return <li key={index}>{item.isi}</li>;
                                } else {
                                  return null; // Hide if index is less than 2 on the right
                                }
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Right div */}
                      <div className="w-full md:w-1/2 p-4 flex items-center justify-center h-auto rounded-2xl overflow-hidden">
                        <Swiper
                          modules={[Autoplay, Pagination, Navigation]}
                          spaceBetween={0} // Set the space between slides to 0
                          slidesPerView={1}
                          loop={true}
                          pagination={{ clickable: true }}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          className="w-full h-full rounded-2xl overflow-hidden"
                        >
                          {filteredCarousels.map((carousel, index) => (
                            <SwiperSlide key={index} className="rounded-2xl overflow-hidden w-full h-full">
                              <img
                                src={BASE_URL + carousel.gambar}
                                style={{ maxHeight: "300px" }}
                                alt={carousel.isi}
                                className="w-full h-full object-cover rounded-2xl overflow-hidden" // Using `object-cover` for image to fill the slide
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
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
  );
};

export default MainPortofolio;
