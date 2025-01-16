import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../navbar";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loading-spinner";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);
  }, [setIsLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
