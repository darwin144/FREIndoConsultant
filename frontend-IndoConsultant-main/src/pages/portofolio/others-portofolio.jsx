/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { fetchOutput, fetchPortfolios, fetchRuangLingkup } from '@/store/actionCreators';

const OtherPortfolio = () => {
  const dispatch = useDispatch();
  const portfolios = useSelector((state) => state.portfolios.portfolios);
  const ruangLingkup = useSelector((state) => state.ruangLingkup.ruangLingkup);
  const output = useSelector((state) => state.output.output);

  const filterPort = portfolios.filter(f => f.divisi === 'Others Portfolio')
  const [isOpen, setIsOpen] = useState(false);



  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // console.log(portfolios, 'ini dia');



  useEffect(() => {
    dispatch(fetchPortfolios());
    dispatch(fetchRuangLingkup());
    dispatch(fetchOutput());
  }, [dispatch]);

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
    className="faq-area-1 space overflow-hidden bg-smoke">
      <div className="container container2">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-lg-12">
            <div className="title-area mb-45">
              <h2 className="sec-title mb-0 wow fadeInLeft" data-wow-delay=".6s" style={fadeInStyle(0.4)}>
                Others Portfolio
              </h2>
            </div>
            <div className="accordion-area accordion" id="faqAccordion" style={fadeInStyle(0.8)}>
              <div className="accordion">
                {filterPort.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={item.id}
                      className="accordion-card active wow fadeInLeft"
                      data-wow-delay=".7s"
                    >
                      <div className="accordion-header" id={`collapse-item-${item.id}`}>
                        <button
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            fontFamily: "var(--title-font)",
                            color: "var(--title-color)",
                            background: isOpen
                              ? "var(--theme-color)"
                              : "var(--white-color)",
                            padding: "0px 30px",
                            minHeight: "75px",
                            gap: "10px",
                            marginBottom: "0",
                            textAlign: "left",
                            border: "none",
                            transition: "0.3s",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            position: "relative",
                            width: "100%",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "var(--theme-color)")
                          }
                          onMouseLeave={(e) =>
                          (e.currentTarget.style.background = isOpen
                            ? "var(--theme-color)"
                            : "var(--white-color)")
                          }
                          onClick={() => toggleAccordion(index)}
                        >
                          <span>{item.judul}</span>
                          <span className="ml-4">{isOpen ? "-" : "+"}</span>
                        </button>
                      </div>
                      <div
                        className={`accordion-collapse transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                          }`}
                        aria-labelledby={`collapse-item-${item.id}`}
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body p-4 bg-gray-100 rounded-lg">
                          {item.isi && (
                            <p className="faq-text">{item.isi}</p>
                          )}
                          <h4 className="project-card-title mb-2 mt-4">Ruang Lingkup</h4>
                          {item.lingkupPekerjaan ? (
                            <p className="faq-text">{item.lingkupPekerjaan}</p>
                          ) : (
                            ruangLingkup.some(r => r.PortfolioId === item.id) && (
                              <ul className="flex flex-wrap list-disc pl-5">
                                {ruangLingkup.filter(r => r.PortfolioId === item.id).map((r, i) => (
                                  <li key={i} className="w-1/2 mb-2">
                                    {r.isi}
                                  </li>
                                ))}
                              </ul>

                            )
                          )}
                          <h4 className="project-card-title mb-2 mt-2">Output</h4>
                          <div className="row">
                            <div className="col-lg-12">
                              <ul className="flex flex-wrap list-disc pl-5">
                                {output.filter(o => o.PortfolioId === item.id).map((o, i) => (
                                  <li key={i} className="w-1/2 mb-2">
                                    {o.isi}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherPortfolio;
