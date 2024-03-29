import React, { useState } from "react";
import { TextField, Button, Paper, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

const SlotBook = () => {
  const { slot } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [description, setDescription] = useState("");

  const baseURL = process.env.REACT_APP_API_URL;
  const selectedDate = dayjs(slot);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      userName: name,
      useEmail: email,
      userPhoneNo: phoneNo,
      date: selectedDate.toString(),
      timeSlot: `${selectedDate.format("h:mm a")} - ${selectedDate
        .add("1", "hour")
        .format("h:mm a")}`,
      desc: description,
    };
    // Handle form submission logic here
    axios.post(`${baseURL}/api/slot/book`, body).then((response) => {
      console.log(response.data);
      setName("");
      setEmail("");
      setDescription("");
      window.location.pathname = "/payment/" + response.data._id;
    });

    // Clear form fields after submission
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Please enter the below details.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone number"
            variant="outlined"
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Date"
            variant="outlined"
            type="text"
            value={selectedDate.format("dddd, MMMM D YYYY")}
            // onChange={(e) => setSelectedDate(e.target.value)}
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Time Slot"
            variant="outlined"
            type="text"
            value={
              selectedDate.format("h:mm a") +
              " - " +
              selectedDate.add("1", "hour").format("h:mm a")
            }
            // onChange={(e) => setSelectedTimeSlot(e.target.value)}
            disabled
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: 2, mb: 2 }}
          >
            Go To Payment
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SlotBook;
