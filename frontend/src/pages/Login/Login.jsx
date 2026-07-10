import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import loginValidation from "../../validation/loginValidation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from "@mui/material";


const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginValidation),
    });

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await loginUser(data);
            localStorage.setItem( "access_token", response.data.access_token );

            toast.success("Login Successful");
            navigate("/");
        }
        catch (error) {
            if (!error.response) {
                toast.error( "Authentication Service is unavailable. Please try again later." );
                return;
            }

            // Timeout
            if (error.code === "ECONNABORTED") {
                toast.error( "Request timed out. Please try again." );
                return;
            }

            switch (error.response.status) {
                case 401:
                    toast.error( "Invalid credentials, Try with correct one!" );
                    break;

                case 403:
                    toast.error( "You are not authorized to login." );
                    break;

                case 404:
                    toast.error( "Authentication Service not found." );
                    break;

                case 422:
                    toast.error( error.response.data.detail );
                    break;

                case 500:
                    toast.error( "Internal Server Error." );
                    break;

                default:
                    toast.error( error.response?.data?.detail || "Something went wrong." );
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f5f5f5" }} >
            <Card sx={{ width: 420, borderRadius: 3, boxShadow: 5 }} >
                <CardContent sx={{ p: 4 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom > Health Forge </Typography>
                        <Typography variant="body2" align="center" color="text.secondary" mb={4} > Healthcare Management System </Typography>

                        <TextField label="Email" fullWidth autoComplete="off" margin="normal" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />

                        <TextField label="Password" type="password" fullWidth autoComplete="off" margin="normal" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />

                        <FormControlLabel control={ <Checkbox name="remember" checked={formData.remember} onChange={handleChange} /> } label="Remember Me" />

                        <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 1, py: 1.3 }} >
                            { loading ? <CircularProgress size={22} color="inherit" /> : "Login" }
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
