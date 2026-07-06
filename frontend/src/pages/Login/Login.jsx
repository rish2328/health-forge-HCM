import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginValidation from "../../validation/loginValidation";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";


import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginValidation)
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
        try {
            const response = await loginUser(data);
            console.log(response);

            // Save JWT
            localStorage.setItem(
                "access_token",
                response.data.access_token
            );

            navigate("/");
        }
        catch (error) {
            console.log(error);
            alert(error.response.data.detail);
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f5f5f5",
            }}
        >
            <Card
                sx={{
                    width: 420,
                    borderRadius: 3,
                    boxShadow: 5,
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                            variant="h4"
                            align="center"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Health Forge
                        </Typography>

                        <Typography
                            variant="body2"
                            align="center"
                            color="text.secondary"
                            mb={4}
                        >
                            Healthcare Management System
                        </Typography>

                        <TextField
                            label="Email"
                            fullWidth
                            autoComplete="off"
                            margin="normal"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            autoComplete="off"
                            margin="normal"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />
                            }
                            label="Remember Me"
                        />

                        <Button type="submit" variant="contained" fullWidth > Login </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Login;
