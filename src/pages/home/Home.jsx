import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firstImg from "../../assets/img/first-img.png";
import ProductMap from "../../components/productmap/ProductMap";
import "../home/Home.css";
import axios from "axios";

const Home = ({
  token,
  data,
  setData,
  searchingWord,
  setIsVisible,
  isVisible,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  isLoading,
  setIsloading,
  sort,
  setSort,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let filters = `?sort=${sort}`;

      if (searchingWord) {
        filters = filters
          ? filters + `&title=${searchingWord}`
          : `&title=${searchingWord}`;
      }

      if (priceMin) {
        filters = filters
          ? filters + `&priceMin=${priceMin}`
          : `&priceMin=${priceMin}`;
      }
      if (priceMax) {
        filters = filters
          ? filters + `&priceMax=${priceMax}`
          : `&priceMax=${priceMax}`;
      }

      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers${filters}`
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
    <main className="home-main">
      <nav className="router-nav">
        <div className="switch-box">
          <p>Prix croiss/décroiss</p>
          <input
            type="checkbox"
            value={sort}
            onChange={() => {
              setSort(sort === "price-desc" ? "price-asc" : "price-desc");
            }}
          />
        </div>
        <div className="range-box">
          <div>prix min : {priceMin}</div>
          <input
            type="range"
            name="price-min"
            placeholder="min"
            value={priceMin}
            onChange={(event) => {
              setPriceMin(event.target.value);
            }}
            min="0"
            max="500"
          />
          <div>prix max : {priceMax}</div>
          <input
            type="range"
            name="price-max"
            placeholder="max"
            value={priceMax}
            onChange={(event) => {
              setPriceMax(event.target.value);
            }}
            min="0"
            max="500"
          />{" "}
        </div>
      </nav>
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        <main className="home-box container">
          <section className="first-section">
            <div className="firstsection-img-div">
              <img
                src={firstImg}
                alt="femme devant un miroir avec son téléphone"
              />
            </div>
            <div className="h1-div">
              <h1>Prêt à faire du tri dans tes placards ?</h1>
              <span
                className="h1-span1"
                onClick={() => {
                  if (token) {
                    navigate("/publish");
                  } else {
                    navigate("/signup");
                    setIsVisible(!isVisible);
                  }
                }}>
                Commencer à vendre
              </span>
            </div>
          </section>

          <section className="second-section">
            <h2>Fil d'actu</h2>
            <div className="home-products-box">
              <ProductMap data={data} />
            </div>
          </section>
        </main>
      )}
    </main>
  );
};

export default Home;
