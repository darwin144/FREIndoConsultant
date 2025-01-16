import { BASE_URL, fetchNews } from '@/store/actionCreators';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


export const Blog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const news = useSelector((state) => state.news.news);
    const [isVisible, setIsVisible] = useState([]); // Track visibility of each news item
    const sectionRefs = useRef([]); // Array of refs for each news item

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const handleLearnMore = (id) => {
        navigate(`/content/${id}`);
    };

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => [...prev, entry.target.id]);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        // Observe each news card
        sectionRefs.current.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, [news]);

    const fadeInStyle = (id, delay = 0) => ({
        opacity: isVisible.includes(id) ? 1 : 0,
        transform: isVisible.includes(id) ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 1.7s ease ${delay}s, transform 1.7s ease ${delay}s`,
    });

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-wrap items-center justify-center min-h-screen">
                {news.map((newsItem, index) => (
                    <div
                        key={newsItem.id}
                        id={`news-${newsItem.id}`}
                        ref={(el) => (sectionRefs.current[index] = el)}
                        style={fadeInStyle(`news-${newsItem.id}`, index * 0.3)}
                        className="mr-4 mb-6 overflow-hidden transition-transform transform duration-300 bg-white rounded-xl shadow-sm hover:shadow-2xl hover:scale-105 w-full max-w-xs md:max-w-sm"
                    >
                        <img
                            src={BASE_URL + newsItem.gambar || "https://via.placeholder.com/500"}
                            className="object-cover w-full h-64"
                            alt={newsItem.judul}
                        />
                        <div className="p-5 border border-t-0 h-full flex flex-col">
                            <a
                                href="/"
                                aria-label="Category"
                                title={newsItem.judul}
                                className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                            >
                                {newsItem.judul}
                            </a>
                            <p className="mb-2 text-gray-700 flex-grow">
                                {truncateText(newsItem.isi, 100)}
                            </p>
                            <a
                                href="/content"
                                aria-label=""
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLearnMore(newsItem.id);
                                }}
                                className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                            >
                                Learn more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {news.length === 0 && (
                <p className="mt-5 text-center">No news available.</p>
            )}
        </div>
    );
};
