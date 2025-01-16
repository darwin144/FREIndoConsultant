/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import {
  AcademicCapIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  LightBulbIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid';

const values = [
  {
    name: 'Smart',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Professional',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Innovative',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus voluptas blanditiis et.',
    icon: LightBulbIcon,
  },
  {
    name: 'Respect',
    description: 'Iure sed ab. Aperiam optio placeat dolor facere. Officiis pariatur eveniet atque et dolor.',
    icon: UserGroupIcon,
  },
  {
    name: 'Integrity',
    description: 'Laudantium tempora sint ut consectetur ratione. Ut illum ut rem numquam fuga delectus.',
    icon: SparklesIcon,
  },
  {
    name: 'Trusted',
    description: 'Culpa dolorem voluptatem velit autem rerum qui et corrupti. Quibusdam quo placeat.',
    icon: ShieldCheckIcon,
  },
];

const Values = () => {
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
    <div className="process-area-3 space overflow-hidden position-relative" ref={sectionRef}>
      <div className="container container2">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-8">
            <div className="title-area text-center">
              <h2 className="sec-title wow fadeInUp" data-wow-delay=".2s" style={fadeInStyle(0)}>
                Our Value
              </h2>
              <span className="sub-title wow fadeInUp" data-wow-delay=".3s" style={fadeInStyle(0.1)}>
                Sebagai perusahaan yang bergerak di bidang Pemeriksaan & Fasilitator kinerja bisnis berkelanjutan bak secara teknik dan manajemen,{" "}
                kami berkomitmen menjadi perusahaan pemeriksaan dan fasilitator kinerja bisnis
                berkelanjutan baik secara teknik dan manajemen, yang dapat meningkatkan reputasi,
                efisiensi operasional, dan memenuhi regulasi, serta berkontribusi pada pembangunan yang
                berkelanjutan melalui value kami, sebagai berikut :
              </span>
            </div>
          </div>
        </div>
        <div className="row gy-30 justify-content-center">
          {values.map((value, index) => (
            <div key={value.name} style={{ marginBottom: '60px' }}>
              <div
                style={fadeInStyle(index * 0.1 + 0.2)} // Staggered effect based on index
                className="process-card style3"
              >
                <div className="process-card-icon">
                  <div className="process-num">{value.name.charAt(0)}</div>
                </div>
                <h3 className="process-card-title">{value.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default Values;
