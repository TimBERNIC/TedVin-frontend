import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Offer from "./pages/offer/Offer";
import Header from "./components/header/Header";
import FixedNav from "./components/fixedNav/FixedNav";
import Footer from "./components/footer/Footer";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data.offers);
        setIsloading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Router>
        <Header />
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <main>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home data={data} />}></Route>
                <Route path="/item/:id" element={<Offer data={data} />}></Route>
              </Routes>
              <FixedNav />
            </div>
          </main>
        )}
        <Footer />
      </Router>
    </>
  );
}

export default App;
