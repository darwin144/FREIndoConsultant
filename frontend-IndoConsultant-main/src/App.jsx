/* eslint-disable no-unused-vars */
import React from "react";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

import About from "./pages/about";
import Services from "./pages/services";
import PemeriksaanDanPenilaianTingkatKomponenDalamNegeri from "./pages/services/pemeriksaan-dan-penilaian-tingkat-komponen-dalam-negeri";
import News from "./pages/news";
import SistemManajemenKeselamatanKetengalistrikan from "./pages/services/sistem-manajemen-keselamatan-ketengalistrikan";
import PengelolaanLingkunganKetenagalistrikan from "./pages/services/pengelolaan-lingkungan-ketenagalistrikan";
import GreenHouseGas from "./pages/services/greenhouse-gas";
import SurveyMapping from "./pages/services/survey-mapping";
import Portofolio from "./pages/portofolio";
import OurTeam from "./pages/team";
import Contact from "./pages/contact";
import Layout from "./components/layout";
import ScrollToTop from "./components/scroll-to-top";
import { Content } from "./pages/news/content";
import store from "./store";
import { NewsTable } from "./pages/admin/newsTable";
import { Login } from "./pages/admin/login";
import { PortfolioTable } from "./pages/admin/portfolioTable";
import { PrivateRoute } from "./pages/PrivateRoute";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/newsTable" element={<PrivateRoute element={<NewsTable />} />} />
            <Route path="/portfolioTable" element={<PrivateRoute element={<PortfolioTable />} />} />


            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />

              <Route path="/about-us" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route
                path="/pemeriksaan-dan-penilaian-tingkat-komponen-dalam-negeri"
                element={<PemeriksaanDanPenilaianTingkatKomponenDalamNegeri />}
              />
              <Route
                path="/pemeriksaan-dan-penilaian-penerapan-sistem-manajemen-keselamatan-ketenagalistrikan"
                element={<SistemManajemenKeselamatanKetengalistrikan />}
              />
              <Route
                path="/pengelolaan-lingkungan-ketenagalistrikan"
                element={<PengelolaanLingkunganKetenagalistrikan />}
              />
              <Route path="/green-house-gas" element={<GreenHouseGas />} />
              <Route
                path="/pemeriksaan-dan-penilaian-kompensasi-tanah"
                element={<SurveyMapping />}
              />
              <Route path="/portofolio" element={<Portofolio />} />
              <Route path="/teams" element={<OurTeam />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/content/:id" element={<Content />} />
            </Route>
          </Routes>
        </Router>
        <ScrollToTop />
      </Provider>
    </>
  );
};

export default App;
