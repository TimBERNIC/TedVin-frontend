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
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const [token, setToken] = useState(Cookies.get("token") || null);

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
        <Header
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          token={token}
        />
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <main>
            <div className="container">
              <Routes>
                <Route path="/" element={<Home data={data} />}></Route>
                <Route path="/item/:id" element={<Offer data={data} />}></Route>
                {isVisible && (
                  <Route
                    path="/signup"
                    element={
                      <SignUp
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                      />
                    }></Route>
                )}
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
