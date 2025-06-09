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
import Publish from "./pages/publish/Publish";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [register, setRegister] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [searchingWord, setSearchingWord] = useState("");
  const [sort, setSort] = useState("price-asc");
  const regex = new RegExp({ searchingWord }, "i");

  // const Url = "https://lereacteur-vinted-api.herokuapp.com/v2/offers";

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";
      if (searchingWord) {
        filters = filters + `?title=${searchingWord}`;
      }
      if (priceMin) {
        if (filters) {
          filters = filters + `&priceMin=${priceMin}`;
        } else {
          filters = filters + `?priceMin=${priceMin}`;
        }
      }
      if (priceMax) {
        if (filters) {
          filters = filters + `&priceMax=${priceMax}`;
        } else {
          filters = filters + `?priceMax=${priceMax}`;
        }
      }

      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?sort=${sort}${filters}`
        );

        setData(response.data.offers);
        setIsloading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchingWord, priceMin, priceMax, sort]);

  return (
    <>
      <Router>
        <Header
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          token={token}
          setToken={setToken}
          setRegister={setRegister}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          searchingWord={searchingWord}
          setSearchingWord={setSearchingWord}
          sort={sort}
          setSort={setSort}
        />
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <div>
            <Routes>
              <Route path="/" element={<Home data={data} />}></Route>
              <Route path="/item/:id" element={<Offer data={data} />}></Route>
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
              <Route
                path="/publish"
                element={
                  <Publish
                    token={token}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
                }></Route>
            </Routes>
            <FixedNav />
          </div>
        )}
        <Footer />
      </Router>
    </>
  );
}

export default App;
