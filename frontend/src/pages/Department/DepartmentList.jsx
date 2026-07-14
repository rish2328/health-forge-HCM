import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import DepartmentHeader from "../../components/department/DepartmentHeader";
import DepartmentFilter from "../../components/department/DepartmentFilter";
import DepartmentTable from "../../components/department/DepartmentTable";
import { getDepartments, deleteDepartment } from "../../api/departmentApi";
import { toast } from "react-toastify";
import DeleteConfirmationDialog from "../../common/DeleteConfirmationDialog";



const DepartmentList = () => {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const response = await getDepartments();
            setDepartments(response.data.data);
        } 
        catch (error) {
            console.error(error);
        } 
        finally {
            setLoading(false);
        }
    };

    const handleDeleteDepartment = async () => {
        try {
            const response = await deleteDepartment(selectedDepartment.uuid);

            toast.success(response.data.message);
            setDepartments((prev) =>
                prev.filter(
                    (department) => department.uuid !== selectedDepartment.uuid
                )
            );

            setDeleteDialogOpen(false);
            setSelectedDepartment(null);
        } 
        catch (error) {
            toast.error( error?.response?.data?.detail || "Failed to delete department." );
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <AppLayout>
            <Container maxWidth={false}>
                <DepartmentHeader />

                <DepartmentFilter />
                
                <DepartmentTable 
                    departments={departments}
                    loading={loading}
                    onEdit={(department) => navigate(`/departments/edit/${department.uuid}`) }
                    onDelete={(department) => { setSelectedDepartment(department); setDeleteDialogOpen(true); }}
                />
                
                <DeleteConfirmationDialog
                    open={deleteDialogOpen}
                    title="Delete Department"
                    content={`Are you sure you want to delete "${selectedDepartment?.name}"?`}
                    onClose={() => {
                        setDeleteDialogOpen(false);
                        setSelectedDepartment(null);
                    }}
                    onConfirm={handleDeleteDepartment}
                />
            </Container>

        </AppLayout>
    );
};

export default DepartmentList;