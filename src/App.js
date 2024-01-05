import "./App.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/homePage";
import SlotBook from "./page/slotBook";
import Payment from "./page/Payment";
import AllBookings from "./page/AllBookings";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateChange = (newDate) => {
    handleOpen();
    let date = new Date(newDate.$d);
    console.log(date);
    setSelectedDate(newDate);
  };

  const handleSlotConfirm = () => {
    window.location.pathname = "/bookslot/" + selectedDate.$d;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="bookslot/:slot" exact element={<SlotBook />} />
        <Route path="payment/:paymentId" exact element={<Payment />} />
        <Route path="allbookings" exact element={<AllBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
