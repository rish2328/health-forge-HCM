import { useState } from "react";
import { Container } from "@mui/material";
import AppLayout from "../../layouts/AppLayout";
import DepartmentHeader from "../../components/department/DepartmentHeader";
import DepartmentFilter from "../../components/department/DepartmentFilter";
import DepartmentTable from "../../components/department/DepartmentTable";



const DepartmentList = () => {

    const [departments] = useState([]);
    const [loading] = useState(false);

    return (
        <AppLayout>
            <Container maxWidth={false}>
                <DepartmentHeader />

                <DepartmentFilter />
                
                <DepartmentTable departments={departments} loading={loading} />
            </Container>
        </AppLayout>
    );
};

export default DepartmentList;