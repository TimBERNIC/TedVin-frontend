import "../checkoutform/CheckoutForm.css";
import axios from "axios";
import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const handleError = (error) => {
    setIsLoading(false);
    setErrorMessage(error.message);
  };
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    // console.log(response); // {error: {…}}
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
      {
        title: { title },
        amount: { price },
      }
    );
    console.log("ici =>", response.data);
    const clientSecret = response.data.client_secret;
    // Confirm the PaymentIntent using the details collected by the Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "/", // redirection vers home
      },
      redirect: "if_required", // annule la redirection
    });
    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
    } else {
      setErrorMessage("");
      setCompleted(true);
    }
  };
  return completed ? (
    <p>Vous avez bien finalisé le paiement !</p>
  ) : (
    <form onSubmit={handleSubmit} className="checkform-box">
      <div className="checkform-box1">
        <PaymentElement />
      </div>
      <button>Pay</button>
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
};

export default CheckoutForm;
