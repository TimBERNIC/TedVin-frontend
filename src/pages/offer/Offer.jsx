import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductMap from "../../components/productmap/ProductMap";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import "../offer/Offer.css";

const Offer = ({ data, setData, searchingWord, isLoading, setIsLoading }) => {
  const params = useParams();
  const [offerData, setOfferData] = useState(null);
  const [isLoadingOffer, setIsLoadingOffer] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/` + params.id
        );
        setOfferData(response.data);
        setIsLoadingOffer(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchOfferData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";

        if (searchingWord) {
          filters = searchingWord && `?title=${searchingWord}`;
        }
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers${filters}`
        );
        setData(response.data.offers);
        setIsLoadingOffer(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [searchingWord]);

  return isLoadingOffer ? (
    <p>Chargement en cours...</p>
  ) : (
    <div className="offer-global-box">
      <div className="container">
        <div className="offer-central-box">
          <div className="offer-product-box">
            <div className="pictures-product-box">
              {offerData.product_pictures.map((picture, index) => {
                return (
                  <div key={index}>
                    <img src={picture.secure_url} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="laterals-details-box">
            <div className="superior-lateral-box">
              <h2>
                {offerData.product_price.toFixed(2)} €
                <div className="final-price-box">
                  {(offerData.product_price * 1.07).toFixed(2)} €
                  <p>
                    inclus la Protection acheteur
                    <IoShieldCheckmarkOutline />
                  </p>
                </div>
              </h2>
              <div className="littlebox">
                <span className="box-title">MARQUE : </span>{" "}
                <span>{offerData.product_details[0]?.MARQUE}</span>
              </div>
              <div className="littlebox product-size">
                <span className="box-title">TAILLE : </span>{" "}
                <span> {offerData.product_details[1]?.TAILLE}</span>
              </div>
              <div className="littlebox product-condition">
                <span className="box-title">ETAT : </span>{" "}
                <span> {offerData.product_details[2]?.ÉTAT}</span>
              </div>
              <div className="littlebox product-color">
                <span className="box-title">COULEUR : </span>{" "}
                <span> {offerData.product_details[3]?.COULEUR}</span>
              </div>
              <div className="littlebox product-localisation">
                <span className="box-title">EMPLACEMENT : </span>{" "}
                <span> {offerData.product_details[4]?.EMPLACEMENT}</span>
              </div>
            </div>
            <div className="inferior-lateral-box">
              <div className="product-name-box">{offerData.product_name}</div>
              <div className="product-description-box">
                {offerData.product_description}
              </div>
              <div className="product-owner">
                <div className="avatar-logo-box">
                  {offerData.owner.account.avatar ? (
                    <img src={offerData.owner.account.avatar.url} alt="" />
                  ) : (
                    <div>
                      <VscAccount size="25px" />
                    </div>
                  )}
                </div>
                {offerData.owner.account.username}
              </div>
              <button
                className="buy-button"
                onClick={() => {
                  const title = offerData.product_name;
                  const price = offerData.product_price;
                  navigate("/payment", {
                    state: { title: { title }, price: { price } },
                  });
                }}>
                Acheter
              </button>
            </div>
          </div>
        </div>

        <div className="offer-products-box">
          <p>{data.length} articles disponibles</p>
          <ProductMap data={data} setIsLoading={setIsLoading} />
        </div>
      </div>
    </div>
  );
};

export default Offer;
