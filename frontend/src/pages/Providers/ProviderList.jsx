import { toast } from "react-toastify";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { getProviders, deleteProvider } from "../../api/providerApi";
import ProviderTable from "../../components/provider/ProviderTable";
import ProviderFilter from "../../components/provider/ProviderFilter";
import ProviderHeader from "../../components/provider/ProviderHeader";
import ProviderDialog from "../../components/provider/dialogs/ProviderDialog";


const ProviderList = () => {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedProviderUUID, setSelectedProviderUUID] = useState(null);

    const navigate = useNavigate();

    const loadProviders = async () => {
        try {
            setLoading(true);
            const response = await getProviders();
            setProviders(response.data.data);
        }
        catch (error) {
            toast.error( error?.response?.data?.message || "Failed to fetch providers." );
        }
        finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearch(value);
        setPage(0);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (uuid) => {
        navigate(`/providers/edit/${uuid}`);
    };

    const handleDelete = (uuid) => {
        setSelectedProviderUUID(uuid);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await deleteProvider(selectedProviderUUID);
            toast.success(response.data.message);
            setDeleteDialogOpen(false);
            setSelectedProviderUUID(null);
            loadProviders();
        } 
        catch (error) {
            toast.error( error?.response?.data?.detail || error?.response?.data?.message || "Failed to delete provider." );
        }
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setSelectedProviderUUID(null);
    };

    const handleView = (uuid) => {
        navigate(`/providers/${uuid}`);
    };

    useEffect(() => {
        loadProviders();
    }, [page, search]);

    return (
        <AppLayout>
            <Container maxWidth={false}>
                <ProviderHeader />

                <ProviderFilter search={search} onSearch={handleSearch} onRefresh={loadProviders} />

                <ProviderTable
                    providers={providers}
                    loading={loading}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalCount={providers.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <ProviderDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onConfirm={confirmDelete} />
            </Container>
        </AppLayout>
    );
};

export default ProviderList;
