import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import dayjs from "dayjs";

const rowsPerPageOptions = [5, 10, 25];

const AllBookings = () => {
  const baseURL = process.env.REACT_APP_API_URL;

  const [slotsData, setSlotsData] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openEditModal = (id) => {
    // Implement logic to fetch data for the given id
    const dataToEdit = slotsData.find((row) => row._id === id);
    setEditedData(dataToEdit);
    setEditModalOpen(true);
  };

  const fetchSlotsData = () => {
    axios.get(`${baseURL}/api/slot/allbookings`).then((response) => {
      console.log(response.data);
      setSlotsData(response.data);
    });
  };
  useEffect(() => {
    fetchSlotsData();
  }, []);

  const handleDelete = (id) => {
    axios.post(`${baseURL}/api/slot/delete-slot/${id}`).then((res) => {
      console.log(res.data);
      setSlotsData(slotsData.filter((item) => item._id !== id));
    });
  };

  const handleEdit = (id) => {
    // Implement edit logic here
    openEditModal(id);
  };

  const handleSaveChanges = (newDate) => {
    setEditedData({
      ...editedData,
      date: newDate.toString()
    })
    // Implement logic to save changes
    // After saving, close the modal
    closeEditModal();
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Here is all your successfull bookings
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center the content horizontally
          // justifyContent: "center", // Center the content vertically
          height: "100vh", // Adjust the height as needed
          overflowY: "auto",
        }}
      >
        <ScheduleTable
          scheduleData={slotsData}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <Dialog open={isEditModalOpen} onClose={closeEditModal}>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation="landscape"
            value={dayjs(editedData.date)}
            disablePast={true}
            onAccept={handleSaveChanges}
            onClose={closeEditModal}
            minutesStep={30}
          />
        </LocalizationProvider> */}

        </DialogContent>
        {/* <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>  
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

const ScheduleTable = ({ scheduleData, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Paper>
      {" "}
      {/* Center the Paper component */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time Slot</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>User Phone Number</TableCell>
              <TableCell>Desc</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ width: "20%" }}>
                    {dayjs(row.date).format("dddd, MMMM D YYYY")}
                  </TableCell>
                  <TableCell sx={{ width: "20%" }}>{row.timeSlot}</TableCell>
                  <TableCell sx={{ width: "10%" }}>{row.userName}</TableCell>
                  <TableCell sx={{ width: "15%" }}>{row.useEmail}</TableCell>
                  <TableCell sx={{ width: "15%" }}>{row.userPhoneNo}</TableCell>
                  <TableCell sx={{ width: "20%" }}>{row.desc}</TableCell>
                  <TableCell sx={{ width: "20vw", display: "flex" }}>
                    <Button
                      onClick={() => onDelete(row._id)}
                      startIcon={<DeleteIcon />}
                      color="error"
                    >
                      Delete
                    </Button>
                    {/* <Button
                      onClick={() => onEdit(row._id)}
                      startIcon={<EditIcon />}
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      Edit
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={scheduleData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default AllBookings;
