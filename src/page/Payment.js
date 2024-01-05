import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { Typography, Paper, Box } from "@mui/material";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_b7a3hFL5nC3qlBCZ6bQACpez00gyMMP52H";

  const onToken = (token) => {
    // axios({
    //   url: "payment",
    //   method: "post",
    //   data: {
    //     amount: priceForStripe,
    //     token: token,
    //   },
    // })
    //   .then((response) => {
    //     alert("succesful payment");
    //   })
    //   .catch((error) => {
    //     console.log("Payment Error: ", error);
    //     alert(
    //       "There was an issue with your payment! Please make sure you use the provided credit card."
    //     );
    //   });
    console.log("payment in in process");
    window.location.pathname = "/allbookings"
  };

  return (
    <StripeCheckout
      label="Pay Now"
      //   name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      //   image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
const Payment = () => {
  const userDetails = {
    email: "user@example.com",
    name: "John Doe",
    phoneNumber: "123-456-7890",
  };

  const timeSlotDetails = {
    date: "2024-01-06", // Replace with your actual date format
    timeSlot: "10:00 AM", // Replace with your actual time slot format
    price: 1000, // Replace with your actual slot price
  };

  const handlePaymentSuccess = () => {
    console.log("Payment successful!");
    // Add your logic for successful payment
  };

  const handlePaymentFailure = () => {
    console.log("Payment failed. Please try again.");
    // Add your logic for payment failure
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Bill Details
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {userDetails.email}
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {userDetails.name}
        </Typography>
        <Typography variant="body1">
          <strong>Date:</strong> {timeSlotDetails.date}
        </Typography>
        <Typography variant="body1">
          <strong>Time Slot:</strong> {timeSlotDetails.timeSlot}
        </Typography>
        <Typography variant="body1">
          <strong>Phone Number:</strong> {userDetails.phoneNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Price:</strong> ${timeSlotDetails.price.toFixed(2)}
        </Typography>
        <div className="stripe-button-center">
          <StripeCheckoutButton price={100} />
        </div>
      </Paper>
    </Box>
  );
};

export default Payment;
