import "../App.css";
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

function HomePage() {
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
  }
  return (
    <div className="App">
      <h1>Hello! Please select a date and time below.</h1>
      <div className="calender">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation="landscape"
            value={selectedDate}
            disablePast={true}
            onAccept={handleDateChange}
          />
        </LocalizationProvider>
      </div>
      <Button
            fullWidth
            variant="outlined"
            sx={{ width: "auto",marginTop: 2, mb: 2 }}
            onClick={() => window.location.pathname = "/allbookings"}
          >
            Checkout all Successfull bookings
          </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you confirm for the below slot on{" "}
            {selectedDate.format("dddd, MMMM D YYYY")}
          </Typography>
          <Typography id="modal-modal-description" variant="h5" sx={{ mt: 2 }}>
            {selectedDate.format("h:mm a")} -{" "}
            {selectedDate.add("1", "hour").format("h:mm a")}
          </Typography>
          <div className="confirm-buttons">
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSlotConfirm} color="primary">
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default HomePage;
