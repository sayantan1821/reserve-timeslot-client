import React, {useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const rowsPerPageOptions = [5, 10, 25];


const AllBookings = () => {
  const [scheduleData, setScheduleData] = useState([
    { id: 1, date: "2024-01-06", timeslot: "10:00 AM" },
    { id: 2, date: "2024-01-07", timeslot: "02:30 PM" },
    // Add more schedule data as needed
  ]);

  const handleDelete = (id) => {
    // Implement delete logic here
    setScheduleData(scheduleData.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    // Implement edit logic here
    console.log(`Edit schedule with ID ${id}`);
  };
  return (
    <div
      style={{ height: 400, width: "50%", margin: "auto", marginTop: "50px" }}
    >
      <h1>Here is all your successfull bookings</h1>
      <div>
        <ScheduleTable
          scheduleData={scheduleData}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time Slot</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.timeslot}</TableCell>
                <TableCell>
                  <Button onClick={() => onDelete(row.id)} startIcon={<DeleteIcon />} color="error">
                    Delete
                  </Button>
                  <Button onClick={() => onEdit(row.id)} startIcon={<EditIcon />} color="primary" sx={{ ml: 1 }}>
                    Edit
                  </Button>
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
