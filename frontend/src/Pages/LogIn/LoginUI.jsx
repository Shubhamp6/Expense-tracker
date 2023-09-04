import React from "react";
import { Box, Collapse, IconButton, useTheme, Paper, useMediaQuery, Typography, Button, ButtonBase, styled, Grid, Avatar, InputBase, NativeSelect, MenuItem, TablePagination, CircularProgress } from "@mui/material"
import { center } from "../../assets/css/theme/common";
import { ExpensierLogo } from "../../components/layouts/common/Logo";
import CustomInput from "../../components/inputs/CustomInput";
import { LogIn } from "../../components/layouts/common/Logo";
import { useNavigate } from "react-router-dom";

const LoginUI = ({ loading, formValues, setFormValues, onSubmit }) => {
    const navigate = useNavigate();
    const Login = styled(ButtonBase)(({ theme }) => ({
        width: "285px",
        display: 'flex',
        borderRadius: "20px",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        alignSelf: "strech",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: "#fff",
        color: "primary.main",
    }))
    return (
        <>
            <Box sx={{ ...center, bgcolor: "#1B191B", height: "100vh", color: "light.main", position: "relative" }}>
                <Box sx={{ display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "24px", position: "absolute", top: "50px", right: "50px" }}>
                    <Typography variant="h3">Not a member?</Typography>
                    <ButtonBase sx={{ width: "100px", borderRadius: "20px", color: "primary.main", background: "#fff", padding: "12px 32px 12px 32px" }} onClick={() => {
                        navigate("/create-user");
                    }}>Sign&nbsp;Up</ButtonBase>
                </Box>
                <Box sx={{ display: "inline-flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "40px" }}>
                    <Box height={"60px"} sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <Box>
                            <ExpensierLogo />
                        </Box>
                        <Box>
                            <Typography variant="h3">
                                Welcome to Expensier
                            </Typography>
                            <Typography variant="p">
                                Log in to sync your account
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ marginLeft: "5px", width: "280px", height: "1px", background: "white", ...center }}>

                    </Box>
                    <Box sx={{ border: "white" }}>
                        <Typography variant="p" color="error">{formValues.err}</Typography>
                        <Box sx={{ width: "285px" }}>
                            <CustomInput
                                inputProps={{
                                    sx: {
                                        color: "text.white"
                                    },
                                    label: {
                                        color: "text.white"
                                    }
                                }}
                                disabled={loading}
                                type="text"
                                label="Email*"
                                value={formValues.email}
                                color="text"
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        err: "",
                                        email: e.target.value,
                                    })
                                }
                                focused
                            />
                            <CustomInput
                                inputProps={{
                                    sx: {
                                        color: "text.white"
                                    }
                                }}
                                color="light"
                                disabled={loading}
                                type="password"
                                label="Password*"
                                value={formValues.password}
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        err: "",
                                        password: e.target.value,
                                    })
                                }
                                focused
                            />
                        </Box>
                    </Box>
                    <Login loading={loading} onClick={onSubmit}>
                        {
                            loading && <>
                                <CircularProgress sx={{ height: "24px" }} />
                            </>
                        }
                        {
                            !loading && <>
                                <LogIn />
                                <Typography sx={{ ...center }} color="primary.main">Log In</Typography>
                            </>
                        }
                    </Login>
                </Box>
            </Box>
        </>
    )
}

export default LoginUI;