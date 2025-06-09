import { Link } from "react-router-dom";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useEffect } from "react";
import "../productmap/ProductMap.css";

const ProductMap = ({ data }) => {
  return (
    <>
      {data.map((product, index) => {
        const productWay_id = `http://localhost:5173/item/${product._id}`;

        return (
          <div className="product-box" key={index}>
            <div className="avatar-box">
              <div className="avatar-logo-box">
                {product.owner.account.avatar ? (
                  <img src={product.owner.account.avatar.url} alt="" />
                ) : (
                  <img></img>
                )}
              </div>
              {product.owner.account.username}
            </div>
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
      })}
    </>
  );
};

export default ProductMap;
