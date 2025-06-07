import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import firstImg from "../../assets/img/first-img.jpg";
import wide from "../../assets/img/wide.jpg";
import ProductMap from "../../components/productmap/ProductMap";
import "../home/Home.css";

const Home = ({
  data,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  searchingWord,
  setSearchingWord,
}) => {
  return (
    <>
      <section className="first-section">
        <div className="firstsection-img-div">
          <img src={firstImg} alt="femme devant un miroir avec son téléphone" />
        </div>
        <div className="h1-div">
          <h1>Prêt a faire du tri dans tes placards ?</h1>
          <span className="h1-span1">Commencer à vendre</span>
          <span className="h1-span2">Découvrir comment ça marche</span>
        </div>
      </section>
      <section className="second-section">
        <h2>Fil d'actu</h2>
        <div className="products-box">
          <ProductMap
            data={data}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            searchingWord={searchingWord}
            setSearchingWord={setSearchingWord}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
