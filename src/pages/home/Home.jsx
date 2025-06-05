import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import firstImg from "../../assets/img/first-img.jpg";
import wide from "../../assets/img/wide.jpg";
import ProductMap from "../../components/productmap/ProductMap";
import "../home/Home.css";

const Home = ({ data }) => {
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
          {data.map((product, index) => {
            if (index < 10) {
              const productWay_id = `http://localhost:5173/item/${product._id}`;

              return (
                <div className="product-box" key={index}>
                  <p className="avatar-box">
                    <div className="avatar-logo-box">
                      <img src={product.owner.account.avatar.url} alt="" />
                    </div>
                    {product.owner.account.username}
                  </p>
                  <Link to={productWay_id} className="product-img-box">
                    <img src={product.product_image.secure_url} alt="" />
                  </Link>
                  <div className="product-details">
                    <p>{product.product_details[0].MARQUE}</p>
                    <p>
                      {product.product_details[1].TAILLE} -
                      {product.product_details[2].ETAT}
                    </p>
                    <p>{product.product_price.toFixed(2)} €</p>
                    <p className="final-price-box">
                      {(product.product_price * 1.07).toFixed(2)} € incl.
                      <IoShieldCheckmarkOutline />
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
      <section className="third-section">
        <img src={wide} alt="fond avec apareil tech" />
        <div className="s3-text">
          <div>
            <p>Nouveau</p>
            <p>Vend tes appareils électroniques sans frais de vente</p>
          </div>
          <button>Commencer à vendre</button>
        </div>
      </section>
      <section className="fourth-section">
        <ProductMap data={data} />
      </section>
    </>
  );
};

export default Home;
