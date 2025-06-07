import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Offer from "./pages/offer/Offer";
import Header from "./components/header/Header";
import FixedNav from "./components/fixedNav/FixedNav";
import Footer from "./components/footer/Footer";
import SignUp from "./pages/signup/SignUp";
import Cookies from "js-cookie";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [register, setRegister] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchingWord, setSearchingWord] = useState("");
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers" +
            `?priceMin=${minPrice}&priceMax=${maxPrice}`
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
        <Header
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          token={token}
          setToken={setToken}
          setRegister={setRegister}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          searchingWord={searchingWord}
          setSearchingWord={setSearchingWord}
        />
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <main>
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      data={data}
                      minPrice={minPrice}
                      setMinPrice={setMinPrice}
                      maxPrice={maxPrice}
                      setMaxPrice={setMaxPrice}
                      searchingWord={searchingWord}
                      setSearchingWord={setSearchingWord}
                    />
                  }></Route>
                <Route
                  path="/item/:id"
                  element={
                    <Offer
                      data={data}
                      minPrice={minPrice}
                      setMinPrice={setMinPrice}
                      maxPrice={maxPrice}
                      setMaxPrice={setMaxPrice}
                      searchingWord={searchingWord}
                      setSearchingWord={setSearchingWord}
                    />
                  }></Route>
                <Route
                  path="/signup"
                  element={
                    isVisible && (
                      <SignUp
                        setIsVisible={setIsVisible}
                        setToken={setToken}
                        register={register}
                        setRegister={setRegister}
                      />
                    )
                  }></Route>
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
