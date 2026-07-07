import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PatientList from "../pages/Patients/PatientList";
import AddPatient from "../pages/Patients/AddPatient";
import EditPatient from "../pages/Patients/EditPatient";
import ViewPatient from "../pages/Patients/ViewPatient";



const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* Login Page Route */}
                <Route path="/login" element={ <PublicRoute><Login /></PublicRoute> } />

                {/* Dashboard Page Route */}
                <Route path="/" element={ <ProtectedRoute><Dashboard /></ProtectedRoute> } />

                {/* Patient Section Route */}
                <Route path="/patients" element={ <ProtectedRoute><PatientList /></ProtectedRoute> } />
                <Route path="/patients/add" element={ <ProtectedRoute><AddPatient /></ProtectedRoute> } />
                <Route path="/patients/view/:uuid" element={ <ProtectedRoute><ViewPatient /></ProtectedRoute> } />
                <Route path="/patients/edit/:uuid" element={ <ProtectedRoute><EditPatient /></ProtectedRoute> } />


                

            </Routes>

        </BrowserRouter>

    );
}

export default AppRoutes;