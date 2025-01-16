/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/indo-consultant.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { HiChevronDown } from "react-icons/hi2";
import Swal from 'sweetalert2';

const serviceList = [
  { title: "Pemeriksaan & Penilaian TKDN Ketenagalistrikan", href: "/pemeriksaan-dan-penilaian-tingkat-komponen-dalam-negeri" },
  { title: "Sistem Manajemen Keselamatan Ketenagakerjaan", href: "/pemeriksaan-dan-penilaian-penerapan-sistem-manajemen-keselamatan-ketenagalistrikan" },
  { title: "Pengelolaan Lingkungan Ketenagalistrikan", href: "/pengelolaan-lingkungan-ketenagalistrikan" },
  { title: "Greenhouse Gas (GHG)", href: "/green-house-gas" },
  { title: "Survey and Mapping", href: "/pemeriksaan-dan-penilaian-kompensasi-tanah" },
];

const menus = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "About Us", href: "/about-us" },
  {
    id: 3,
    name: "Services",
    href: "/services",
    hasDropdown: true,
  },
  { id: 4, name: "Portofolio", href: "/portofolio" },
  { id: 5, name: "News", href: "/news" },
  { id: 6, name: "Team", href: "/teams" },
  { id: 7, name: "Contact", href: "/contact" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const hasLocalStorageItem = localStorage.getItem('access_token') !== null;
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      text: "You will be logged out of this account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('access_token'); // Hapus token
        navigate('/'); // Arahkan pengguna ke halaman home
      }
    });
  };

  const handleNavigation = (href) => {
    window.location.href = href; // Melakukan refresh saat navigasi
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Disclosure
        as="nav"
        className={`w-full transition-all duration-500 ${isScrolled ? "bg-white" : "bg-transparent"}`}
      >
        {({ open }) => (
          <div className="px-4 py-4 md:px-8">
            {/* Logo Section above Navigation */}
            <div className="flex items-start justify-between ml-6">
              {/* Logo di kiri */}
              <a href="/" className="flex flex-col p-1 transition-transform transform hover:scale-105">
                <img alt="Logo Indo Consultant" src={logo} className="w-60 h-60 object-contain rounded-lg" />
              </a>

              {/* Logo user di kanan */}
              <div className="flex items-center">
                <a href={hasLocalStorageItem ? "/newstable" : "/login"} className="p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </a>

                {/* Garis pemisah */}
                {localStorage.getItem('access_token') && (
                  <div className="hidden md:flex items-center">
                    <div className="w-0.5 h-6 bg-blue-800 mx-2"></div>
                    <a href="#" className="p-1" onClick={handleLogout}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center h-16">
              {/* Navigation Links for Desktop */}
              <div className="hidden xl:flex lg:gap-x-12 ml-2">
                <NavigationMenu>
                  <NavigationMenuList>
                    {menus.map((menu) => (
                      <NavigationMenuItem key={menu.id}>
                        <Link to={menu.href} onClick={() => handleNavigation(menu.href)}>
                          <NavigationMenuTrigger showChevron={menu.hasDropdown}>
                            {menu.name}
                          </NavigationMenuTrigger>
                        </Link>
                        {menu.hasDropdown && (
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 bg-white list-none">
                              {serviceList.map((service) => (
                                <ListItem key={service.title} title={service.title} href={service.href} />
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              {/* Mobile Menu with Right-Aligned Button */}
              <div className="flex xl:hidden justify-end w-full">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="rounded flex bg-[#265093]">
                      <Bars3Icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="overflow-y-auto">
                    {/* Logo in Mobile Menu */}
                    <div className="py-5 px-2">
                      <a href="/" className="flex flex-col items-center">
                        <img alt="Logo Indo Consultant" src={logo} className="h-16 w-16 object-contain mb-2" />
                      </a>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-3">
                      {menus.map((item) => (
                        <div key={item.id}>
                          <a href={item.href} className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-300" onClick={() => handleNavigation(item.href)}>
                            {item.name}
                          </a>
                          {item.hasDropdown && (
                            <div className="pl-4">
                              {serviceList.map((service) => (
                                <a key={service.title} href={service.href} className="block py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-300" onClick={() => handleNavigation(service.href)}>
                                  {service.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {localStorage.getItem('access_token') && (
                        <div>
                          <a href="#" className="block py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-300" onClick={handleLogout}>
                            Logout
                          </a>
                          <div className="h-px w-full bg-gray-300" />
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </header>
  );
};

const ListItem = ({ title, href }) => (
  <li>
    <a href={href} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md transition duration-200">
      {title}
    </a>
  </li>
);

export default Header;
