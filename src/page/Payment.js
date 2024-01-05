import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ amount, onSuccess, onFailure }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { token } = await stripe.createToken(cardElement);

      // Simulate a 2-second delay for processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate a successful payment
      onSuccess();
    } catch (error) {
      console.error(error);
      onFailure();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment}>
      <div>
        <label>Amount:</label>
        <input type="text" value={`$${amount.toFixed(2)}`} readOnly />
      </div>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

const Payment = () => {
  return <div>Payment</div>;
};

export default Payment;
