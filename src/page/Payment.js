import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { Typography, Paper, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

// const stripePromise = loadStripe("YOUR_STRIPE_SECRET_KEY");
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_b7a3hFL5nC3qlBCZ6bQACpez00gyMMP52H";
    const baseURL = process.env.REACT_APP_API_URL;
  const onToken = (token) => {
    // axios({
    //   url: `${baseURL}/api/payment`,
    //   method: "post",
    //   data: {
    //     amount: priceForStripe,
    //     token: token.id,
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
    // console.log("payment in in process");
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
  const { slotId } = useParams();
  const [slot, setSlot] = useState({})
  const baseURL = process.env.REACT_APP_API_URL;

  const handlePaymentSuccess = () => {
    console.log("Payment successful!");
    // Add your logic for successful payment
  };

  const handlePaymentFailure = () => {
    console.log("Payment failed. Please try again.");
    // Add your logic for payment failure
  };

  useEffect(() => {
    console.log(slotId)
    axios.get(`${baseURL}/api/slot/${slotId}`).then((res) => {
      setSlot(res.data)
      // console.log(dayjs(res.data.date).format('h:mm A'))
    })
  }, [])
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 400, margin: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Bill Details
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {slot.useEmail}
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {slot.userName}
        </Typography>
        <Typography variant="body1">
          <strong>Date:</strong> {dayjs(slot.date).format("dddd, MMMM D YYYY")}
        </Typography>
        <Typography variant="body1">
          <strong>Time Slot:</strong> {
              dayjs(slot.date).format("h:mm a") +
              " - " +
              dayjs(slot.date).add("1", "hour").format("h:mm a")
            }
        </Typography>
        <Typography variant="body1">
          <strong>Phone Number:</strong> {slot.userPhoneNo}
        </Typography>
        <Typography variant="body1">
          <strong>Price:</strong> ${100}
        </Typography>
        <div className="stripe-button-center">
          <StripeCheckoutButton price={100} />
        </div>
      </Paper>
    </Box>
  );
};

export default Payment;
