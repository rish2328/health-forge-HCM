import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import PatientHeader from "../../components/patient/PatientHeader";
import PatientFilter from "../../components/patient/PatientFilter";
import PatientTable from "../../components/patient/PatientTable";
import { getPatients } from "../../api/patientApi";
import DeleteConfirmationDialog from "../../common/DeleteConfirmationDialog";
import { deletePatient } from "../../api/patientApi";
import { toast } from "react-toastify";



const PatientList = () => {
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await getPatients();
            console.log(response.data);
            setPatients(response.data.data);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (patient) => {
        navigate(`/patients/edit/${patient.uuid}`);
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleDelete = (patient) => {
        setSelectedPatient(patient);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deletePatient(selectedPatient.uuid);
            toast.success("Patient deleted successfully.");
            setDeleteDialogOpen(false);
            setSelectedPatient(null);
            fetchPatients();
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to delete patient."
            );
        }
    };

    const handleView = (patient) => {
        navigate(`/patients/dashboard/${patient.uuid}`);
    };

    return (
        <AppLayout>
            <Container maxWidth={false} >
                <PatientHeader onAdd={() => navigate("/patients/add")} />

                <PatientFilter />

                <PatientTable
                    patients={patients}
                    loading={loading}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalCount={patients.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                />

                <DeleteConfirmationDialog
                    open={deleteDialogOpen}
                    title="Delete Patient"
                    message={`Are you sure you want to delete "${selectedPatient?.first_name} ${selectedPatient?.last_name}" ?`}
                    onClose={() => {
                        setDeleteDialogOpen(false);
                        setSelectedPatient(null);
                    }}
                    onConfirm={confirmDelete}
                />
            </Container>
        </AppLayout>
    );
};

export default PatientList;
