import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import "./Payment.css";

import CheckoutForm from "../../components/checkoutform/CheckoutForm";

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);
console.log(location.state);

const Payment = () => {
  const location = useLocation();
  if (!location.state) {
    return alert("veuillez sélectionner une offre"), (<Navigate to="/" />);
  }
  const { title, price } = location.state;
  const protectionPrice = 0.59;
  const livraisonPrice = price.price * 0.15;
  const total = price.price + protectionPrice + livraisonPrice;
  const amount = total * 100;

  const options = {
    mode: "payment",
    amount: amount, // équivaut à 10,99 $
    currency: "eur",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <main className="payment-global-box">
      <div className="container">
        <section className="payment-section1">
          <p>résumé de la commande</p>
          <div>
            <p>
              <span>Commande</span>
              <span>{price.price} €</span>
            </p>
            <p>
              <span>Frais de protection acheteurs</span>
              <span>{protectionPrice} €</span>
            </p>
            <p>
              <span>Frais de port</span>
              <span>{livraisonPrice} €</span>
            </p>
          </div>
          <div>
            <p className="weight total-box">
              <span>Total</span>
              <span>{total} €</span>
            </p>
            <div className="resume-buy">
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir{" "}
                <span className="weight">{title.title}</span>.
              </p>
              <p>
                Vous allez payer <span className="weight">{total} €</span>(frais
                de protection et frais de port inclus)
              </p>
            </div>
          </div>
        </section>
        <section className="payment-section2 ">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm title={title.title} amount={amount} />
          </Elements>
        </section>
      </div>
    </main>
  );
};

export default Payment;
