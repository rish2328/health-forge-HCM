import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import DepartmentForm from "../../components/department/DepartmentForm";

const EditDepartment = () => {

    const { uuid } = useParams();

    return (
        <AppLayout>
            <Container maxWidth={false}>
                <DepartmentForm mode="edit" uuid={uuid} />
            </Container>
        </AppLayout>
    );
};

export default EditDepartment;