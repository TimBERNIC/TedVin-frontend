import { useParams } from "react-router-dom";
import ProductMap from "../components/ProductMap";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const Offer = ({ data }) => {
  const params = useParams();
  const foundItem = data.find((product) => {
    return product._id === params.id;
  });
  console.log(foundItem);

  return (
    <div className="offer-global-box">
      <div className="offer-central-box">
        <div className="offer-product-box">
          {foundItem.product_pictures.map((picture, index) => {
            return (
              <div>
                <img src={picture.secure_url} alt="" />
              </div>
            );
          })}
          <div>
            Lorem /ipsum /dolor/ sit/ amet /consectetur/ adipisicing /elit.
          </div>
        </div>
        <p>{data.length} articles disponibles</p>
        <div className="products-box">
          <ProductMap data={data} />
        </div>
      </div>
      <div className="laterals-details">
        <div>
          <div>{foundItem.product_name}</div>
          <div>
            {foundItem.product_details[1].TAILLE &&
              foundItem.product_details[1].TAILLE}
            ·
            {foundItem.product_details[2].ETAT &&
              foundItem.product_details[2].ETAT}
            ·
            {foundItem.product_details[4].EMPLACEMENT &&
              foundItem.product_details[4].EMPLACEMENT}
          </div>
          <p>{foundItem.product_price.toFixed(2)} €</p>
          <div className="final-price-box">
            {(foundItem.product_price * 1.07).toFixed(2)} €
            <p>
              inclus la Protection acheteur
              <IoShieldCheckmarkOutline />
            </p>
          </div>
        </div>
        <p>
          {foundItem.product_details[3].COULEUR &&
            foundItem.product_details[3].COULEUR}
        </p>
        <div>
          <div>
            <span>Envoi </span>
            <span>
              à partir de {(foundItem.product_price * 0.07).toFixed(2)} €
            </span>
          </div>
          <div>
            <button>Acheter</button>
            <button>Faire une offre</button>
            <button>Message</button>
          </div>
        </div>
        <div></div>
        <div>
          <h3>Frais de Protection acheteurs</h3>
          <p>
            Pour tout achat effectué par le biais du bouton Acheter, nous
            appliquons des frais couvrant notre Protection acheteurs. Cette
            Protection acheteurs comprend notre Politique de remboursement.
          </p>
        </div>
        <div>
          <div>NOM DU VENDEUR</div>
          <div>ACTIVITE DU VENDEUR</div>
          <div>LOCALISATION DU VENDEUR</div>
        </div>
        <p>
          Les lois en matière de protection des consommateur·trices ne
          s’appliquent pas à tes achats effectués auprès d’autres
          consommateur·trices. Plus précisément, le droit de retrait visé à
          l’article L221-18 et la garantie générale de conformité visée aux
          articles L217-4 et suivants du Code de la consommation ne s’appliquent
          pas à ta transaction. Cependant, la garantie des défauts de la chose
          vendue visée aux articles 1641 et suivants du Code civil français
          s’applique. Voir également les dispositions applicables du droit des
          obligations et de responsabilité civile. Tous les achats que tu
          effectues au moyen du bouton « Acheter » sont couverts par notre
          service de Protection acheteurs.
        </p>
      </div>
    </div>
  );
};

export default Offer;
