import { Link, useNavigate, useParams } from "react-router-dom";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import "../productmap/ProductMap.css";

const ProductMap = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const params = useParams();

  return !data ? (
    <p>Chargement en cours...</p>
  ) : (
    <>
      {data.map((product, index) => {
        const productWayByid = `/item/${product._id}`;
        return (
          <div className="product-box" key={index}>
            <div className="avatar-box">
              <div className="avatar-logo-box">
                {product.owner.account.avatar ? (
                  <img
                    src={product.owner.account.avatar.url}
                    alt="avatar-logo"
                  />
                ) : (
                  <div>
                    <VscAccount size="25px" />
                  </div>
                )}
              </div>
              {product.owner.account.username}
            </div>
            <div
              onClick={() => {
                navigate(productWayByid);
              }}
              className="product-img-box">
              <img src={product.product_image.secure_url} alt="" />
            </div>
            <div className="product-details">
              <p>{product.product_details[2].MARQUE}</p>
              <p>
                {product.product_details[3].TAILLE} -
                {product.product_details[0].ETAT}
              </p>
              <p>{product.product_price.toFixed(2)} €</p>
              <p className="final-price-box">
                {(product.product_price * 1.07).toFixed(2)} € incl.
                <IoShieldCheckmarkOutline />
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductMap;
