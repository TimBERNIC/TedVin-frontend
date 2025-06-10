import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  data={data}
                  setData={setData}
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
              }></Route>
            <Route
              path="/item/:id"
              element={
                <Offer
                  data={data}
                  setData={setData}
                  searchingWord={searchingWord}
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
                    data={data}
                    setData={setData}
                    isLoading={setIsloading}
                    setIsloading={setIsloading}
                    searchingWord={searchingWord}
                    setSearchingWord={setSearchingWord}
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

        <Footer />
      </Router>
    </>
  );
}

export default App;
