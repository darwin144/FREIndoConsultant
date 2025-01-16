import { BASE_URL, fetchNews } from '@/store/actionCreators';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export const Content = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const news = useSelector((state) => state.news.news);
  const filterNews = news.filter((n) => n.id === Number(id));

  // Log all news items for debugging
  console.log(news, 'All news items');
  const currentNews = filterNews[0]; // Access the first matching news item

  useEffect(() => {
    dispatch(fetchNews());
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
      className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="mx-auto sm:text-center lg:max-w-2xl">
        {currentNews ? (
          <>
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12" style={fadeInStyle(0.4)}>
              <h2 className="max-w-lg mt-14 mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                {currentNews.judul}
              </h2>
            </div>
            <div className="mb-4 transition-shadow duration-300 hover:shadow-xl lg:mb-6" style={fadeInStyle(0.6)}>
              <img
                className="object-cover w-full h-40 rounded shadow-lg sm:h-64 md:h-80 lg:h-96"
                src={BASE_URL + currentNews.gambar}
                alt={currentNews.judul}
              />
            </div>
            <p className="max-w-xl mb-4 text-base text-gray-700 sm:mx-auto" style={fadeInStyle(0.8)}>
              {currentNews.isi}
            </p>
          </>
        ) : (
          <p>No news found.</p>
        )}
      </div>
    </div>
  );
};
