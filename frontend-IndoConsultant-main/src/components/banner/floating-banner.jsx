/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { HiMiniMap } from "react-icons/hi2";
import { HiMail, HiPhone } from "react-icons/hi";

const information = [
  {
    id: 1,
    name: "Phone Number",
    label: "(021) 3156995",
    href: "tel:+62213156995",
    icon: <HiPhone className="w-5 h-5 text-white" />,
  },
  {
    id: 2,
    name: "Email",
    label: "info@indoconsultant.id",
    href: "mailto:info@indoconsultant.id",
    icon: <HiMail className="w-5 h-5 text-white" />,
  },
  {
    id: 3,
    name: "Location",
    label: "Jl. Taman Kebon Sirih III No.11A, Jakarta Pusat",
    icon: <HiMiniMap className="w-5 h-5 text-white" />,
  },
];

export default function FloatingBanner({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;
  return (
    <>
      <div className="pointer-events-none hidden lg:block fixed inset-x-0 top-0 z-20 w-full">
        <div className="pointer-events-auto flex w-full items-center justify-between gap-x-6 bg-[#2F4F75] px-6 py-2.5 sm:py-3.5 sm:pl-4 sm:pr-3.5">
          <p className="text-sm leading-6 text-white flex space-x-4">
            {information.map((info) => (
              <a
                key={info.id}
                href={info.href}
                className="flex items-center gap-x-2 text-xs md:text-base"
              >
                {/* <img src={info.icon} alt={info.name} /> */}
                {info.icon}
                {info.label}
              </a>
            ))}
          </p>
          <button
            type="button"
            className="-m-3 flex-none p-3 focus-visible:outline-offset-[-4px]"
            onClick={handleClose}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
