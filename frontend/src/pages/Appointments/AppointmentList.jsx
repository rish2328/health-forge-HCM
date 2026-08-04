import { useState } from "react";
import { Container } from "@mui/material";

import AppLayout from "../../layouts/AppLayout";

import AppointmentHeader from "../../components/appointment/AppointmentHeader";
import AppointmentFilter from "../../components/appointment/AppointmentFilter";
import AppointmentTable from "../../components/appointment/AppointmentTable";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (appointment) => {
    console.log(appointment);
  };

  const handleEdit = (appointment) => {
    console.log(appointment);
  };

  const handleDelete = (appointment) => {
    console.log(appointment);
  };

  return (
    <AppLayout>
      <Container maxWidth={false}>
        <AppointmentHeader />

        <AppointmentFilter />

        <AppointmentTable
          appointments={appointments}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={appointments.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Container>
    </AppLayout>
  );
};

export default AppointmentList;
